from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, EmailStr, ConfigDict
from typing import List, Optional
import uuid
from datetime import datetime, timezone


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

app = FastAPI(title="Raibi Jamila World Cup 2026 API")
api_router = APIRouter(prefix="/api")


# ---------- Models ----------
class NewsletterCreate(BaseModel):
    email: EmailStr
    locale: Optional[str] = "fr"
    country: Optional[str] = None


class NewsletterEntry(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    email: str
    locale: str = "fr"
    country: Optional[str] = None
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class RoarEvent(BaseModel):
    intensity: float
    locale: Optional[str] = "fr"


class SocialPost(BaseModel):
    id: str
    author: str
    handle: str
    avatar: str
    content: str
    image: Optional[str] = None
    likes: int
    location: str
    timestamp: str


class Store(BaseModel):
    id: str
    name: str
    address: str
    city: str
    country: str
    lat: float
    lng: float


# ---------- Static data ----------
SOCIAL_POSTS = [
    {
        "id": "1",
        "author": "Yassine El Amrani",
        "handle": "@yassine_atlas",
        "avatar": "https://api.dicebear.com/7.x/avataaars/svg?seed=Yassine",
        "content": "Atlas Lions, vous portez nos rêves ! 🦁 Raibi à la main, drapeau au cœur. #MoroccoUSA2026",
        "image": "https://customer-assets.emergentagent.com/job_moroccan-trophy/artifacts/oy8dcj13_4706d7be-a4b2-4f3e-a690-c9933aa253f6.png",
        "likes": 4821,
        "location": "Casablanca, MA",
        "timestamp": "2h"
    },
    {
        "id": "2",
        "author": "Layla Benkirane",
        "handle": "@laylabkrn",
        "avatar": "https://api.dicebear.com/7.x/avataaars/svg?seed=Layla",
        "content": "From Marrakech to New York — same flag, same Raibi, same fierté.",
        "image": None,
        "likes": 2310,
        "location": "Brooklyn, NY",
        "timestamp": "5h"
    },
    {
        "id": "3",
        "author": "Karim Naciri",
        "handle": "@karim_n",
        "avatar": "https://api.dicebear.com/7.x/avataaars/svg?seed=Karim",
        "content": "ديما المغرب 🇲🇦 جميلة هي الأصل!",
        "image": None,
        "likes": 1987,
        "location": "Rabat, MA",
        "timestamp": "8h"
    },
    {
        "id": "4",
        "author": "Sofia Mansouri",
        "handle": "@sofiamns",
        "avatar": "https://api.dicebear.com/7.x/avataaars/svg?seed=Sofia",
        "content": "Public viewing à Times Square, on a fait trembler Manhattan ce soir 🔥",
        "image": None,
        "likes": 3654,
        "location": "New York, NY",
        "timestamp": "12h"
    },
    {
        "id": "5",
        "author": "Omar Tazi",
        "handle": "@omar_tazi",
        "avatar": "https://api.dicebear.com/7.x/avataaars/svg?seed=Omar",
        "content": "Le goût de mon enfance, le goût de la victoire. Jamila depuis 1966.",
        "image": None,
        "likes": 1245,
        "location": "Tangier, MA",
        "timestamp": "1d"
    },
    {
        "id": "6",
        "author": "Amina Choukri",
        "handle": "@amina_c",
        "avatar": "https://api.dicebear.com/7.x/avataaars/svg?seed=Amina",
        "content": "Edition limitée World Cup acquise ✅ Collector forever !",
        "image": None,
        "likes": 892,
        "location": "Fès, MA",
        "timestamp": "1d"
    }
]

STORES = [
    {"id": "s1", "name": "Marjane Casablanca Anfa", "address": "Bd de la Corniche", "city": "Casablanca", "country": "MA", "lat": 33.5731, "lng": -7.5898},
    {"id": "s2", "name": "Carrefour Rabat Mega Mall", "address": "Av. Mohammed VI", "city": "Rabat", "country": "MA", "lat": 34.0209, "lng": -6.8416},
    {"id": "s3", "name": "Aswak Assalam Marrakech", "address": "Rte de Casablanca", "city": "Marrakech", "country": "MA", "lat": 31.6295, "lng": -7.9811},
    {"id": "s4", "name": "BIM Tangier Centre", "address": "Av. Mohamed V", "city": "Tangier", "country": "MA", "lat": 35.7595, "lng": -5.8340},
    {"id": "s5", "name": "Atlas Market Brooklyn", "address": "4521 Atlantic Ave", "city": "Brooklyn", "country": "US", "lat": 40.6782, "lng": -73.9442},
    {"id": "s6", "name": "Maghreb Grocery NYC", "address": "238 W 28th St", "city": "New York", "country": "US", "lat": 40.7484, "lng": -73.9967},
    {"id": "s7", "name": "Casablanca Market LA", "address": "10912 W Pico Blvd", "city": "Los Angeles", "country": "US", "lat": 34.0489, "lng": -118.4131},
    {"id": "s8", "name": "Sahara Foods Dearborn", "address": "13900 Michigan Ave", "city": "Dearborn", "country": "US", "lat": 42.3022, "lng": -83.2110},
]


# ---------- Routes ----------
@api_router.get("/")
async def root():
    return {"message": "Raibi Jamila World Cup 2026 API", "status": "live"}


@api_router.post("/newsletter", response_model=NewsletterEntry)
async def subscribe_newsletter(payload: NewsletterCreate):
    # Avoid duplicates (idempotent)
    existing = await db.newsletter.find_one({"email": payload.email}, {"_id": 0})
    if existing:
        ts = existing.get("timestamp")
        if isinstance(ts, str):
            try:
                existing["timestamp"] = datetime.fromisoformat(ts)
            except ValueError:
                existing["timestamp"] = datetime.now(timezone.utc)
        elif not isinstance(ts, datetime):
            existing["timestamp"] = datetime.now(timezone.utc)
        return NewsletterEntry(**existing)

    entry = NewsletterEntry(email=payload.email, locale=payload.locale or "fr", country=payload.country)
    doc = entry.model_dump()
    doc["timestamp"] = doc["timestamp"].isoformat()
    await db.newsletter.insert_one(doc)
    return entry


@api_router.get("/newsletter/count")
async def newsletter_count():
    n = await db.newsletter.count_documents({})
    return {"count": n}


@api_router.post("/roar")
async def log_roar(event: RoarEvent):
    doc = {
        "id": str(uuid.uuid4()),
        "intensity": event.intensity,
        "locale": event.locale or "fr",
        "timestamp": datetime.now(timezone.utc).isoformat(),
    }
    await db.roars.insert_one(doc)
    total = await db.roars.count_documents({})
    avg_cursor = db.roars.aggregate([{"$group": {"_id": None, "avg": {"$avg": "$intensity"}}}])
    avg = 0.0
    async for d in avg_cursor:
        avg = d.get("avg", 0.0) or 0.0
    return {"ok": True, "total_roars": total, "avg_intensity": round(avg, 3)}


@api_router.get("/roar/stats")
async def roar_stats():
    total = await db.roars.count_documents({})
    return {"total_roars": total}


@api_router.get("/social/feed", response_model=List[SocialPost])
async def social_feed():
    return SOCIAL_POSTS


@api_router.get("/stores", response_model=List[Store])
async def list_stores(country: Optional[str] = None):
    if country:
        return [s for s in STORES if s["country"].lower() == country.lower()]
    return STORES


app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
