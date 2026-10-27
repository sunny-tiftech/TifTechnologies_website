from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict, BeforeValidator
from typing import Annotated, List
from datetime import datetime, timezone
from bson import ObjectId


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

app = FastAPI()
api_router = APIRouter(prefix="/api")


def _coerce_oid(v):
    return str(v) if isinstance(v, ObjectId) else v


PyObjectId = Annotated[str, BeforeValidator(_coerce_oid)]


class BaseDocument(BaseModel):
    model_config = ConfigDict(populate_by_name=True)
    id: PyObjectId = Field(default_factory=lambda: str(ObjectId()), alias="_id")


class ContactEnquiryCreate(BaseModel):
    name: str = Field(min_length=1, max_length=120)
    email: str = Field(min_length=3, max_length=200)
    phone: str = Field(default="", max_length=40)
    service: str = Field(default="", max_length=120)
    budget: str = Field(default="", max_length=60)
    message: str = Field(min_length=1, max_length=5000)


class ContactMessage(BaseDocument):
    name: str
    email: str
    phone: str = ""
    service: str = ""
    budget: str = ""
    message: str
    created_at: str = Field(default_factory=lambda: datetime.now(timezone.utc).isoformat())

    def to_mongo(self):
        return self.model_dump(by_alias=True)

    @classmethod
    def from_mongo(cls, doc):
        return cls(**dict(doc))


class StatusCheck(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(ObjectId()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class StatusCheckCreate(BaseModel):
    client_name: str


@api_router.get("/")
async def root():
    return {"message": "Tif Technologies API is running"}


@api_router.post("/contact")
async def create_contact(enquiry: ContactEnquiryCreate):
    email = enquiry.email.strip()
    if "@" not in email or "." not in email.split("@")[-1]:
        raise HTTPException(status_code=400, detail="Invalid email address")
    msg = ContactMessage(
        name=enquiry.name.strip(),
        email=email,
        phone=enquiry.phone.strip(),
        service=enquiry.service.strip(),
        budget=enquiry.budget.strip(),
        message=enquiry.message.strip(),
    )
    await db.contact_messages.insert_one(msg.to_mongo())
    return {"id": msg.id, "status": "received", "created_at": msg.created_at}


@api_router.get("/contact")
async def list_contacts():
    docs = await db.contact_messages.find().sort("created_at", -1).to_list(200)
    return [{"id": d.get("_id"), **{k: v for k, v in d.items() if k != "_id"}} for d in docs]


@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_obj = StatusCheck(client_name=input.client_name)
    doc = status_obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    _ = await db.status_checks.insert_one(doc)
    return status_obj


@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    status_checks = await db.status_checks.find({}, {"_id": 0}).to_list(1000)
    for check in status_checks:
        if isinstance(check['timestamp'], str):
            check['timestamp'] = datetime.fromisoformat(check['timestamp'])
    return status_checks


app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
