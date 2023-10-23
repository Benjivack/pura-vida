from fastapi import FastAPI
from routers import users, posts, favorites, reviews, status
from fastapi.middleware.cors import CORSMiddleware
from authenticator import authenticator
import os

app = FastAPI()
app.include_router(authenticator.router)
app.include_router(users.router)
app.include_router(posts.router)
app.include_router(favorites.router)
app.include_router(reviews.router)
app.include_router(status.router)


app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        os.environ.get("CORS_HOST", "http://localhost:3000")
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def root():
    return {"message": "You hit the root path!"}


@app.get("/api/launch-details")
def launch_details():
    return {
        "launch_details": {
            "module": 3,
            "week": 17,
            "day": 5,
            "hour": 19,
            "min": "00"
        }
    }
