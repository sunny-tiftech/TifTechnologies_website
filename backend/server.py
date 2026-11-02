import os
import re
import json
import uuid
import asyncio
import ipaddress
import logging
from html import escape
from html.parser import HTMLParser
from urllib.parse import urlparse
from pathlib import Path
from datetime import datetime, timezone, timedelta

from dotenv import load_dotenv

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

from fastapi import FastAPI, APIRouter, HTTPException, Request, Response, Depends
from starlette.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from typing import List
import bcrypt
import jwt
import httpx

from sqlalchemy import Column, String, Integer, Text, JSON, select
from sqlalchemy.orm import DeclarativeBase
from sqlalchemy.ext.asyncio import create_async_engine, async_sessionmaker

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

from urllib.parse import quote_plus

# Database configuration: supports either single MYSQL_URL or individual components
MYSQL_URL = os.environ.get("MYSQL_URL")
if not MYSQL_URL:
    MYSQL_HOST = os.environ.get("MYSQL_HOST", "localhost")
    MYSQL_PORT = os.environ.get("MYSQL_PORT", "3306")
    MYSQL_USER = os.environ.get("MYSQL_USER", "tif_user")
    MYSQL_PASSWORD = os.environ.get("MYSQL_PASSWORD", "")
    MYSQL_DATABASE = os.environ.get("MYSQL_DATABASE", "tif_db")
    MYSQL_URL = f"mysql+aiomysql://{MYSQL_USER}:{quote_plus(MYSQL_PASSWORD)}@{MYSQL_HOST}:{MYSQL_PORT}/{MYSQL_DATABASE}"

engine = create_async_engine(MYSQL_URL, pool_pre_ping=True, pool_recycle=280)
SessionLocal = async_sessionmaker(engine, expire_on_commit=False)

app = FastAPI()
api_router = APIRouter(prefix="/api")

JWT_SECRET = os.environ.get("JWT_SECRET", "tif-default-jwt-secret-key-change-in-production")
JWT_ALGORITHM = "HS256"

EMAIL_BASE_URL = os.environ.get("EMAIL_BASE_URL", "https://integrations.emergentagent.com")
EMAIL_KEY = os.environ.get("EMERGENT_EMAIL_KEY")
EMAIL_FROM_NAME = os.environ.get("EMAIL_FROM_NAME", "Tif Technologies")
EMAIL_REPLY_TO = os.environ.get("EMAIL_REPLY_TO")


def _now_iso() -> str:
    return datetime.now(timezone.utc).isoformat()


def _new_id() -> str:
    return uuid.uuid4().hex


# ---------- MySQL tables ----------

class Base(DeclarativeBase):
    pass


class UserRow(Base):
    __tablename__ = "users"
    id = Column(String(64), primary_key=True)
    email = Column(String(255), unique=True, nullable=False, index=True)
    password_hash = Column(String(255), nullable=False)
    name = Column(String(120), default="Admin")
    role = Column(String(40), default="admin")
    created_at = Column(String(64))


class LoginAttemptRow(Base):
    __tablename__ = "login_attempts"
    identifier = Column(String(255), primary_key=True)
    count = Column(Integer, default=0)
    last = Column(String(64))


class SiteContentRow(Base):
    __tablename__ = "site_content"
    doc_key = Column(String(50), primary_key=True)
    content = Column(JSON)


class CustomPageRow(Base):
    __tablename__ = "custom_pages"
    slug = Column(String(80), primary_key=True)
    title = Column(String(200))
    intro = Column(Text)
    body = Column(Text)
    created_at = Column(String(64))


class ContactMessageRow(Base):
    __tablename__ = "contact_messages"
    id = Column(String(64), primary_key=True)
    name = Column(String(120))
    email = Column(String(200))
    phone = Column(String(40), default="")
    service = Column(String(120), default="")
    budget = Column(String(60), default="")
    message = Column(Text)
    created_at = Column(String(64))


class StatusCheckRow(Base):
    __tablename__ = "status_checks"
    id = Column(String(64), primary_key=True)
    client_name = Column(String(255))
    timestamp = Column(String(64))


# ---------- API models ----------

class ContactEnquiryCreate(BaseModel):
    name: str = Field(min_length=1, max_length=120)
    email: str = Field(min_length=3, max_length=200)
    phone: str = Field(default="", max_length=40)
    service: str = Field(default="", max_length=120)
    budget: str = Field(default="", max_length=60)
    message: str = Field(min_length=1, max_length=5000)


class StatusCheck(BaseModel):
    id: str
    client_name: str
    timestamp: datetime


class StatusCheckCreate(BaseModel):
    client_name: str


class CustomPage(BaseModel):
    slug: str = Field(min_length=1, max_length=80)
    title: str = Field(min_length=1, max_length=200)
    intro: str = Field(default="", max_length=1000)
    body: str = Field(default="", max_length=20000)
    created_at: str = Field(default_factory=_now_iso)


SLUG_RE = re.compile(r"^[a-z0-9]+(?:-[a-z0-9]+)*$")


# ---------- Email (Emergent managed Resend) ----------

_SHORTENERS = ("bit.ly", "tinyurl.com", "t.co", "is.gd", "cutt.ly", "goo.gl", "rebrand.ly")
_CRED_ASK = ("reply with your password", "reply with the code", "send your password", "cvv",
             "send us your password", "enter your password below", "confirm your card number",
             "your full card number", "seed phrase", "recovery phrase", "verify your card",
             "social security number", "confirm your bank details")
_HOSTISH = re.compile(r"\b(?:https?://)?((?:[a-z0-9-]+\.)+[a-z]{2,})", re.I)


def _host_ok(host: str) -> bool:
    if not host or "xn--" in host:
        return False
    try:
        ipaddress.ip_address(host)
        return False
    except ValueError:
        pass
    return not any(host == s or host.endswith("." + s) for s in _SHORTENERS)


def _same_site(shown: str, real: str) -> bool:
    return shown == real or real.endswith("." + shown) or shown.endswith("." + real)


class _EmailScan(HTMLParser):
    def __init__(self):
        super().__init__()
        self.tags, self.urls, self.anchors = set(), [], []
        self._href, self._text = None, []

    def handle_starttag(self, tag, attrs):
        self.tags.add(tag.lower())
        self.urls += [v for k, v in attrs if k.lower() in ("href", "src") and v]
        if tag.lower() == "a":
            self._href = dict((k.lower(), v) for k, v in attrs).get("href")
            self._text = []

    def handle_data(self, data):
        if self._href is not None:
            self._text.append(data)

    def handle_endtag(self, tag):
        if tag.lower() == "a" and self._href is not None:
            self.anchors.append((self._href, "".join(self._text)))
            self._href, self._text = None, []


def _assert_safe_email(subject: str, html: str) -> None:
    scan = _EmailScan()
    scan.feed(html)
    if scan.tags & {"form", "input", "textarea", "select"}:
        raise ValueError("No forms or input fields in email (G2)")
    body = f"{subject}\n{html}".lower()
    for p in _CRED_ASK:
        if p in body:
            raise ValueError(f"Email asks the recipient for credentials: {p!r} (G2)")
    for url in scan.urls:
        low = url.strip().lower()
        if low.startswith(("mailto:", "tel:", "cid:", "#")):
            continue
        if not low.startswith("https://"):
            raise ValueError(f"Email links/assets must be absolute https: {url!r} (G3)")
        host = urlparse(low).hostname or ""
        if not _host_ok(host) or urlparse(low).username is not None:
            raise ValueError(f"Shortened, numeric-host or credential-bearing URL: {url!r} (G3)")
    for href, text in scan.anchors:
        real = urlparse(href.strip().lower()).hostname or ""
        if not real:
            continue
        for m in _HOSTISH.finditer(text):
            if not _same_site(m.group(1).lower(), real):
                raise ValueError(f"Anchor text {m.group(1)!r} != real link host {real!r} (G3)")


async def send_email(*, to: str, subject: str, html: str, reply_to: str | None = None) -> str | None:
    if not EMAIL_KEY:
        logger.info("EMAIL_KEY not configured; skipping email send")
        return None
    _assert_safe_email(subject, html)
    payload = {"to": [to], "subject": subject, "html": html, "from_name": EMAIL_FROM_NAME}
    if reply_to or EMAIL_REPLY_TO:
        payload["contact_email"] = reply_to or EMAIL_REPLY_TO
    try:
        async with httpx.AsyncClient(timeout=30) as http:
            resp = await http.post(
                f"{EMAIL_BASE_URL}/api/v1/email/send",
                headers={"X-Email-Key": EMAIL_KEY},
                json=payload,
            )
        resp.raise_for_status()
        return resp.json().get("id")
    except httpx.HTTPStatusError as e:
        try:
            code = e.response.json().get("code", "")
        except ValueError:
            code = ""
        if code in ("insufficient_credits", "integration_disabled", "daily_limit_reached"):
            logger.warning(f"Email paused: {code} ({e.response.status_code}): {e.response.json().get('message', '')}")
            return None
        logger.error(f"Email send failed: {e.response.status_code} {e.response.text}")
        return None
    except Exception as e:
        logger.error(f"Email send error: {str(e)}")
        return None


def _row(label: str, value: str) -> str:
    shown = escape(value) if value else "—"
    return (
        f'<tr><td style="padding:8px 16px;font-size:13px;color:#64748B;font-family:Arial,sans-serif;'
        f'width:120px;vertical-align:top">{label}</td>'
        f'<td style="padding:8px 16px;font-size:14px;color:#0F172A;font-family:Arial,sans-serif">{shown}</td></tr>'
    )


async def notify_new_enquiry(name: str, email: str, phone: str, service: str, budget: str, message: str, created_at: str) -> None:
    to = os.environ.get("OWNER_EMAIL")
    if not to:
        logger.info("OWNER_EMAIL not set; skipping enquiry notification email")
        return
    subject = "New enquiry received — Tif Technologies website"
    rows = (
        _row("Name", name) + _row("Email", email) + _row("Phone", phone)
        + _row("Service", service) + _row("Budget", budget)
        + _row("Message", message) + _row("Received", created_at)
    )
    html = (
        '<table role="presentation" width="100%" style="background:#F1F5F9;padding:24px"><tr><td>'
        '<table role="presentation" width="600" align="center" style="background:#FFFFFF;border-radius:12px;overflow:hidden">'
        '<tr><td style="background:#1E1A5E;padding:20px 24px;font-family:Arial,sans-serif;color:#FFFFFF;'
        'font-size:16px;font-weight:bold">New enquiry — Tif Technologies</td></tr>'
        f'<tr><td style="padding:16px"><table role="presentation" width="100%">{rows}</table></td></tr>'
        '<tr><td style="padding:16px 24px;font-size:12px;color:#94A3B8;font-family:Arial,sans-serif">'
        'Sent automatically by the Tif Technologies website enquiry form.</td></tr>'
        '</table></td></tr></table>'
    )
    await send_email(to=to, subject=subject, html=html)


# ---------- Auth (JWT, httpOnly cookies) ----------

def hash_password(password: str) -> str:
    return bcrypt.hashpw(password.encode("utf-8"), bcrypt.gensalt()).decode("utf-8")


def verify_password(plain_password: str, hashed_password: str) -> bool:
    return bcrypt.checkpw(plain_password.encode("utf-8"), hashed_password.encode("utf-8"))


def create_access_token(user_id: str, email: str) -> str:
    payload = {"sub": user_id, "email": email, "exp": datetime.now(timezone.utc) + timedelta(minutes=15), "type": "access"}
    return jwt.encode(payload, JWT_SECRET, algorithm=JWT_ALGORITHM)


def create_refresh_token(user_id: str) -> str:
    payload = {"sub": user_id, "exp": datetime.now(timezone.utc) + timedelta(days=7), "type": "refresh"}
    return jwt.encode(payload, JWT_SECRET, algorithm=JWT_ALGORITHM)


async def get_current_user(request: Request) -> dict:
    token = request.cookies.get("access_token")
    if not token:
        auth_header = request.headers.get("Authorization", "")
        if auth_header.startswith("Bearer "):
            token = auth_header[7:]
    if not token:
        raise HTTPException(status_code=401, detail="Not authenticated")
    try:
        payload = jwt.decode(token, JWT_SECRET, algorithms=[JWT_ALGORITHM])
        if payload.get("type") != "access":
            raise HTTPException(status_code=401, detail="Invalid token type")
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token expired")
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=401, detail="Invalid token")
    async with SessionLocal() as session:
        user = await session.get(UserRow, payload["sub"])
        if not user:
            raise HTTPException(status_code=401, detail="User not found")
        return {"id": user.id, "email": user.email, "name": user.name or "Admin", "role": user.role or "admin"}


class LoginInput(BaseModel):
    email: str
    password: str


@api_router.post("/auth/login")
async def login(body: LoginInput, request: Request, response: Response):
    email = body.email.strip().lower()
    identifier = f"{request.client.host}:{email}"
    async with SessionLocal() as session:
        attempt = await session.get(LoginAttemptRow, identifier)
        if attempt and (attempt.count or 0) >= 5:
            last_dt = datetime.fromisoformat(attempt.last) if attempt.last else None
            if last_dt and datetime.now(timezone.utc) - last_dt < timedelta(minutes=15):
                raise HTTPException(status_code=429, detail="Too many failed attempts. Try again in 15 minutes.")
        result = await session.execute(select(UserRow).where(UserRow.email == email))
        user = result.scalar_one_or_none()
        if not user or not verify_password(body.password, user.password_hash):
            if attempt:
                attempt.count = (attempt.count or 0) + 1
                attempt.last = _now_iso()
            else:
                session.add(LoginAttemptRow(identifier=identifier, count=1, last=_now_iso()))
            await session.commit()
            raise HTTPException(status_code=401, detail="Invalid email or password")
        if attempt:
            await session.delete(attempt)
            await session.commit()
        uid = user.id
    response.set_cookie(key="access_token", value=create_access_token(uid, email), httponly=True, secure=True, samesite="none", max_age=900, path="/")
    response.set_cookie(key="refresh_token", value=create_refresh_token(uid), httponly=True, secure=True, samesite="none", max_age=604800, path="/")
    return {"id": uid, "email": email, "name": user.name or "Admin", "role": user.role or "admin"}


@api_router.post("/auth/logout")
async def logout(response: Response):
    response.delete_cookie("access_token", path="/")
    response.delete_cookie("refresh_token", path="/")
    return {"status": "logged_out"}


@api_router.get("/auth/me")
async def me(user=Depends(get_current_user)):
    return user


@api_router.post("/auth/refresh")
async def refresh(request: Request, response: Response):
    token = request.cookies.get("refresh_token")
    if not token:
        raise HTTPException(status_code=401, detail="No refresh token")
    try:
        payload = jwt.decode(token, JWT_SECRET, algorithms=[JWT_ALGORITHM])
        if payload.get("type") != "refresh":
            raise HTTPException(status_code=401, detail="Invalid token type")
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=401, detail="Invalid refresh token")
    async with SessionLocal() as session:
        user = await session.get(UserRow, payload["sub"])
        if not user:
            raise HTTPException(status_code=401, detail="User not found")
        email = user.email
    response.set_cookie(key="access_token", value=create_access_token(payload["sub"], email), httponly=True, secure=True, samesite="none", max_age=900, path="/")
    return {"status": "refreshed"}


async def seed_admin():
    admin_email = os.environ.get("ADMIN_EMAIL", "admin@example.com")
    admin_password = os.environ.get("ADMIN_PASSWORD", "admin123")
    async with SessionLocal() as session:
        result = await session.execute(select(UserRow).where(UserRow.email == admin_email))
        existing = result.scalar_one_or_none()
        if existing is None:
            session.add(UserRow(
                id=_new_id(),
                email=admin_email,
                password_hash=hash_password(admin_password),
                name="Admin",
                role="admin",
                created_at=_now_iso(),
            ))
        elif not verify_password(admin_password, existing.password_hash):
            existing.password_hash = hash_password(admin_password)
        await session.commit()


async def seed_content():
    async with SessionLocal() as session:
        existing = await session.get(SiteContentRow, "site")
        if not existing:
            with open(ROOT_DIR / "seed_content.json") as f:
                data = json.load(f)
            session.add(SiteContentRow(doc_key="site", content=data))
            await session.commit()
            logger.info("Site content seeded into MySQL")


@app.on_event("startup")
async def startup():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
    await seed_admin()
    await seed_content()


# ---------- Public content routes ----------

@api_router.get("/")
async def root():
    return {"message": "Tif Technologies API is running", "database": "MySQL"}


@api_router.get("/content")
async def get_content():
    async with SessionLocal() as session:
        row = await session.get(SiteContentRow, "site")
        if not row:
            raise HTTPException(status_code=404, detail="Content not found")
        return row.content


@api_router.get("/pages")
async def list_pages():
    async with SessionLocal() as session:
        result = await session.execute(
            select(CustomPageRow.slug, CustomPageRow.title, CustomPageRow.intro, CustomPageRow.created_at)
            .order_by(CustomPageRow.created_at)
        )
        return [dict(r._mapping) for r in result.all()]


@api_router.get("/pages/{slug}")
async def get_page(slug: str):
    async with SessionLocal() as session:
        row = await session.get(CustomPageRow, slug)
        if not row:
            raise HTTPException(status_code=404, detail="Page not found")
        return {"slug": row.slug, "title": row.title, "intro": row.intro, "body": row.body, "created_at": row.created_at}


@api_router.post("/contact")
async def create_contact(enquiry: ContactEnquiryCreate):
    email = enquiry.email.strip()
    if "@" not in email or "." not in email.split("@")[-1]:
        raise HTTPException(status_code=400, detail="Invalid email address")
    row = ContactMessageRow(
        id=_new_id(),
        name=enquiry.name.strip(),
        email=email,
        phone=enquiry.phone.strip(),
        service=enquiry.service.strip(),
        budget=enquiry.budget.strip(),
        message=enquiry.message.strip(),
        created_at=_now_iso(),
    )
    async with SessionLocal() as session:
        session.add(row)
        await session.commit()
    asyncio.create_task(notify_new_enquiry(row.name, row.email, row.phone, row.service, row.budget, row.message, row.created_at))
    return {"id": row.id, "status": "received", "created_at": row.created_at}


# ---------- Admin routes ----------

@api_router.get("/admin/enquiries")
async def admin_enquiries(user=Depends(get_current_user)):
    async with SessionLocal() as session:
        result = await session.execute(
            select(ContactMessageRow).order_by(ContactMessageRow.created_at.desc()).limit(500)
        )
        rows = result.scalars().all()
        return [
            {
                "id": r.id,
                "name": r.name,
                "email": r.email,
                "phone": r.phone,
                "service": r.service,
                "budget": r.budget,
                "message": r.message,
                "created_at": r.created_at,
            }
            for r in rows
        ]


@api_router.put("/admin/content")
async def update_content(request: Request, user=Depends(get_current_user)):
    payload = await request.json()
    if not isinstance(payload, dict) or "hero" not in payload or "services" not in payload:
        raise HTTPException(status_code=400, detail="Invalid content payload")
    payload = {k: v for k, v in payload.items() if k not in ("key", "_id")}
    async with SessionLocal() as session:
        row = await session.get(SiteContentRow, "site")
        if not row:
            row = SiteContentRow(doc_key="site", content=payload)
            session.add(row)
        else:
            row.content = payload
        await session.commit()
    return {"status": "saved"}


@api_router.post("/admin/pages")
async def create_page(page: CustomPage, user=Depends(get_current_user)):
    if not SLUG_RE.match(page.slug):
        raise HTTPException(status_code=400, detail="Slug must be lowercase letters, numbers and hyphens")
    async with SessionLocal() as session:
        existing = await session.get(CustomPageRow, page.slug)
        if existing:
            raise HTTPException(status_code=409, detail="A page with this slug already exists")
        session.add(CustomPageRow(slug=page.slug, title=page.title, intro=page.intro, body=page.body, created_at=page.created_at))
        await session.commit()
    return {"status": "created", "slug": page.slug}


@api_router.put("/admin/pages/{slug}")
async def update_page(slug: str, page: CustomPage, user=Depends(get_current_user)):
    if not SLUG_RE.match(page.slug):
        raise HTTPException(status_code=400, detail="Slug must be lowercase letters, numbers and hyphens")
    async with SessionLocal() as session:
        existing = await session.get(CustomPageRow, slug)
        if not existing:
            raise HTTPException(status_code=404, detail="Page not found")
        if page.slug != slug:
            clash = await session.get(CustomPageRow, page.slug)
            if clash:
                raise HTTPException(status_code=409, detail="A page with this slug already exists")
            session.add(CustomPageRow(slug=page.slug, title=page.title, intro=page.intro, body=page.body, created_at=existing.created_at))
            await session.delete(existing)
        else:
            existing.title = page.title
            existing.intro = page.intro
            existing.body = page.body
        await session.commit()
    return {"status": "updated", "slug": page.slug}


@api_router.delete("/admin/pages/{slug}")
async def delete_page(slug: str, user=Depends(get_current_user)):
    async with SessionLocal() as session:
        row = await session.get(CustomPageRow, slug)
        if not row:
            raise HTTPException(status_code=404, detail="Page not found")
        await session.delete(row)
        await session.commit()
    return {"status": "deleted"}


@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    row = StatusCheckRow(id=_new_id(), client_name=input.client_name, timestamp=_now_iso())
    async with SessionLocal() as session:
        session.add(row)
        await session.commit()
    return StatusCheck(id=row.id, client_name=row.client_name, timestamp=datetime.fromisoformat(row.timestamp))


@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    async with SessionLocal() as session:
        result = await session.execute(select(StatusCheckRow).limit(1000))
        rows = result.scalars().all()
        return [
            StatusCheck(id=r.id, client_name=r.client_name, timestamp=datetime.fromisoformat(r.timestamp))
            for r in rows
        ]


app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("shutdown")
async def shutdown_db_client():
    await engine.dispose()
