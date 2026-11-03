"""Tests for CAPTCHA and contact form endpoints."""
import os
import re
import pytest
import requests

BASE_URL = os.environ.get("REACT_APP_BACKEND_URL", "https://ideaz-factory.preview.emergentagent.com").rstrip("/")


@pytest.fixture
def api():
    s = requests.Session()
    s.headers.update({"Content-Type": "application/json"})
    return s


def _get_captcha(api):
    r = api.get(f"{BASE_URL}/api/captcha", timeout=15)
    assert r.status_code == 200, r.text
    data = r.json()
    assert "captcha_id" in data and "question" in data
    m = re.search(r"What is (\d+)\s*\+\s*(\d+)\?", data["question"])
    assert m, f"Unexpected question format: {data['question']}"
    answer = int(m.group(1)) + int(m.group(2))
    return data["captcha_id"], answer, data["question"]


class TestCaptcha:
    def test_captcha_shape(self, api):
        cid, ans, q = _get_captcha(api)
        assert isinstance(cid, str) and len(cid) > 10
        assert "What is" in q

    def test_two_captchas_different_ids(self, api):
        c1, _, _ = _get_captcha(api)
        c2, _, _ = _get_captcha(api)
        assert c1 != c2


class TestContactSubmission:
    def test_correct_captcha_succeeds(self, api):
        cid, ans, _ = _get_captcha(api)
        payload = {
            "name": "TEST_User",
            "email": "test_user@example.com",
            "phone": "",
            "service": "",
            "budget": "",
            "message": "TEST message from automated test",
            "captcha_id": cid,
            "captcha_answer": str(ans),
        }
        r = api.post(f"{BASE_URL}/api/contact", json=payload, timeout=20)
        assert r.status_code == 200, r.text
        data = r.json()
        assert data["status"] == "received"
        assert "id" in data

    def test_wrong_captcha_rejected(self, api):
        cid, ans, _ = _get_captcha(api)
        wrong = str(ans + 7)
        payload = {
            "name": "TEST_User",
            "email": "test_user@example.com",
            "message": "TEST wrong captcha",
            "captcha_id": cid,
            "captcha_answer": wrong,
        }
        r = api.post(f"{BASE_URL}/api/contact", json=payload, timeout=20)
        assert r.status_code == 400
        assert "aptcha" in r.json().get("detail", "")

    def test_replay_captcha_rejected(self, api):
        cid, ans, _ = _get_captcha(api)
        payload = {
            "name": "TEST_User",
            "email": "test_user@example.com",
            "message": "TEST replay first",
            "captcha_id": cid,
            "captcha_answer": str(ans),
        }
        r1 = api.post(f"{BASE_URL}/api/contact", json=payload, timeout=20)
        assert r1.status_code == 200, r1.text
        # replay
        payload["message"] = "TEST replay second"
        r2 = api.post(f"{BASE_URL}/api/contact", json=payload, timeout=20)
        assert r2.status_code == 400
        assert "aptcha" in r2.json().get("detail", "")

    def test_missing_captcha_fields_422(self, api):
        payload = {
            "name": "TEST_User",
            "email": "test_user@example.com",
            "message": "no captcha",
        }
        r = api.post(f"{BASE_URL}/api/contact", json=payload, timeout=20)
        assert r.status_code == 422
