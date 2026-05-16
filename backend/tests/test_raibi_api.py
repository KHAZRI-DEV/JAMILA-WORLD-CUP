"""Backend tests for Raibi Jamila World Cup 2026 API."""
import os
import uuid
import pytest
import requests

BASE_URL = os.environ.get("REACT_APP_BACKEND_URL", "https://moroccan-trophy.preview.emergentagent.com").rstrip("/")
API = f"{BASE_URL}/api"


@pytest.fixture(scope="module")
def session():
    s = requests.Session()
    s.headers.update({"Content-Type": "application/json"})
    return s


def _assert_no_mongo_id(obj):
    """Recursively assert no '_id' leaks in any response."""
    if isinstance(obj, dict):
        assert "_id" not in obj, f"_id leaked: {obj}"
        for v in obj.values():
            _assert_no_mongo_id(v)
    elif isinstance(obj, list):
        for v in obj:
            _assert_no_mongo_id(v)


# ---------- Root ----------
class TestRoot:
    def test_root_returns_message_and_status(self, session):
        r = session.get(f"{API}/")
        assert r.status_code == 200
        data = r.json()
        assert "message" in data and "status" in data
        assert data["status"] == "live"
        _assert_no_mongo_id(data)


# ---------- Newsletter ----------
class TestNewsletter:
    def test_subscribe_valid_email(self, session):
        email = f"TEST_user_{uuid.uuid4().hex[:8]}@example.com"
        r = session.post(f"{API}/newsletter", json={"email": email, "locale": "fr", "country": "MA"})
        assert r.status_code == 200, r.text
        data = r.json()
        assert data["email"] == email
        assert "id" in data and isinstance(data["id"], str)
        assert "timestamp" in data
        assert data["locale"] == "fr"
        _assert_no_mongo_id(data)

    def test_subscribe_duplicate_email_idempotent(self, session):
        email = f"TEST_dup_{uuid.uuid4().hex[:8]}@example.com"
        r1 = session.post(f"{API}/newsletter", json={"email": email})
        assert r1.status_code == 200
        id1 = r1.json()["id"]

        r2 = session.post(f"{API}/newsletter", json={"email": email})
        assert r2.status_code == 200, f"Duplicate should not error, got: {r2.text}"
        data2 = r2.json()
        assert data2["email"] == email
        # Should return same id (idempotent)
        assert data2["id"] == id1
        _assert_no_mongo_id(data2)

    def test_subscribe_invalid_email_422(self, session):
        r = session.post(f"{API}/newsletter", json={"email": "not-an-email"})
        assert r.status_code == 422

    def test_newsletter_count_at_least_one(self, session):
        # Seed one
        session.post(f"{API}/newsletter", json={"email": f"TEST_count_{uuid.uuid4().hex[:8]}@example.com"})
        r = session.get(f"{API}/newsletter/count")
        assert r.status_code == 200
        data = r.json()
        assert "count" in data
        assert isinstance(data["count"], int)
        assert data["count"] >= 1
        _assert_no_mongo_id(data)


# ---------- Roar ----------
class TestRoar:
    def test_log_roar(self, session):
        r = session.post(f"{API}/roar", json={"intensity": 0.75, "locale": "en"})
        assert r.status_code == 200, r.text
        data = r.json()
        assert data["ok"] is True
        assert data["total_roars"] >= 1
        assert "avg_intensity" in data
        assert isinstance(data["avg_intensity"], (int, float))
        _assert_no_mongo_id(data)

    def test_roar_stats(self, session):
        # ensure at least one
        session.post(f"{API}/roar", json={"intensity": 0.5})
        r = session.get(f"{API}/roar/stats")
        assert r.status_code == 200
        data = r.json()
        assert data["total_roars"] >= 1
        _assert_no_mongo_id(data)

    def test_roar_increments(self, session):
        before = session.get(f"{API}/roar/stats").json()["total_roars"]
        session.post(f"{API}/roar", json={"intensity": 0.9})
        after = session.get(f"{API}/roar/stats").json()["total_roars"]
        assert after == before + 1


# ---------- Social feed ----------
class TestSocialFeed:
    def test_feed_returns_6_posts(self, session):
        r = session.get(f"{API}/social/feed")
        assert r.status_code == 200
        data = r.json()
        assert isinstance(data, list)
        assert len(data) == 6
        required = {"id", "author", "handle", "avatar", "content", "likes", "location", "timestamp"}
        for post in data:
            assert required.issubset(post.keys()), f"Missing fields in: {post}"
            assert isinstance(post["likes"], int)
        _assert_no_mongo_id(data)


# ---------- Stores ----------
class TestStores:
    def test_all_stores_returns_8(self, session):
        r = session.get(f"{API}/stores")
        assert r.status_code == 200
        data = r.json()
        assert len(data) == 8
        required = {"id", "name", "address", "city", "country", "lat", "lng"}
        for s in data:
            assert required.issubset(s.keys())
        _assert_no_mongo_id(data)

    def test_stores_country_MA(self, session):
        r = session.get(f"{API}/stores", params={"country": "MA"})
        assert r.status_code == 200
        data = r.json()
        assert len(data) > 0
        for s in data:
            assert s["country"] == "MA"

    def test_stores_country_US(self, session):
        r = session.get(f"{API}/stores", params={"country": "US"})
        assert r.status_code == 200
        data = r.json()
        assert len(data) > 0
        for s in data:
            assert s["country"] == "US"

    def test_stores_MA_plus_US_equals_total(self, session):
        ma = session.get(f"{API}/stores", params={"country": "MA"}).json()
        us = session.get(f"{API}/stores", params={"country": "US"}).json()
        assert len(ma) + len(us) == 8
