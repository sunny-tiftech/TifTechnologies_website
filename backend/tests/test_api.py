"""Backend API tests for Tif Technologies.

Covers: root, content, contact submission, admin auth login.
"""
import os
import time
import pytest
import requests

BASE_URL = os.environ.get("REACT_APP_BACKEND_URL", "https://ideaz-factory.preview.emergentagent.com").rstrip("/")
ADMIN_EMAIL = os.environ.get("ADMIN_EMAIL", "admin@tiftechnologies.com")
ADMIN_PASSWORD = os.environ.get("ADMIN_PASSWORD", "TifAdmin@2026")


@pytest.fixture(scope="module")
def session():
    s = requests.Session()
    s.headers.update({"Content-Type": "application/json"})
    return s


# ---------- Root / health ----------

def test_root_returns_200_with_db_status(session):
    r = session.get(f"{BASE_URL}/api/")
    assert r.status_code == 200, r.text
    data = r.json()
    assert "message" in data
    assert "database" in data
    assert data["database"] == "MySQL"


# ---------- Content ----------

def test_content_returns_services_and_portfolio(session):
    r = session.get(f"{BASE_URL}/api/content")
    assert r.status_code == 200, r.text
    data = r.json()
    assert isinstance(data, dict)
    # Content should include services and portfolio keys per feature list
    assert "services" in data, f"keys: {list(data.keys())}"
    services = data["services"]
    assert isinstance(services, list)
    assert len(services) >= 10, f"Expected >=10 services, got {len(services)}"
    assert "portfolio" in data, f"keys: {list(data.keys())}"


# ---------- Contact ----------

def test_contact_submission_success(session):
    payload = {
        "name": "TEST_User",
        "email": "test_user@example.com",
        "phone": "+911234567890",
        "service": "Web Development",
        "budget": "1000-5000",
        "message": "This is an automated backend test enquiry. Please ignore.",
    }
    r = session.post(f"{BASE_URL}/api/contact", json=payload)
    assert r.status_code == 200, r.text
    data = r.json()
    assert data.get("status") == "received"
    assert "id" in data and isinstance(data["id"], str) and len(data["id"]) > 0
    assert "created_at" in data


def test_contact_submission_invalid_email(session):
    payload = {
        "name": "TEST_User",
        "email": "not-an-email",
        "phone": "+911234567890",
        "service": "Web",
        "budget": "100",
        "message": "x",
    }
    r = session.post(f"{BASE_URL}/api/contact", json=payload)
    assert r.status_code == 400, r.text


# ---------- Auth ----------

def test_admin_login_success(session):
    r = session.post(
        f"{BASE_URL}/api/auth/login",
        json={"email": ADMIN_EMAIL, "password": ADMIN_PASSWORD},
    )
    assert r.status_code == 200, r.text
    data = r.json()
    assert data["email"] == ADMIN_EMAIL.lower()
    assert data["role"] == "admin"
    assert "id" in data
    # httpOnly cookies set
    cookies = {c.name: c for c in r.cookies}
    assert "access_token" in cookies
    assert "refresh_token" in cookies


def test_admin_login_invalid_password_returns_401():
    # Use fresh session to avoid lockout bleed from other tests
    s = requests.Session()
    s.headers.update({"Content-Type": "application/json"})
    r = s.post(
        f"{BASE_URL}/api/auth/login",
        json={"email": ADMIN_EMAIL, "password": "wrong-password-xyz"},
    )
    assert r.status_code in (401, 429), r.text


def test_auth_me_with_valid_cookie():
    s = requests.Session()
    r = s.post(
        f"{BASE_URL}/api/auth/login",
        json={"email": ADMIN_EMAIL, "password": ADMIN_PASSWORD},
    )
    assert r.status_code == 200, r.text
    r2 = s.get(f"{BASE_URL}/api/auth/me")
    assert r2.status_code == 200, r2.text
    data = r2.json()
    assert data["email"] == ADMIN_EMAIL.lower()
