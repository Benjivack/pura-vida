from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from routers import users, posts, favorites, reviews, status
from queries.accounts import pool
from fastapi.middleware.cors import CORSMiddleware
from authenticator import authenticator
import os

app = FastAPI()
app.include_router(authenticator.router, tags=["Authentication"])
app.include_router(users.router, tags=["User"])
app.include_router(posts.router, tags=["Posts"])
app.include_router(favorites.router, tags=["Favorites"])
app.include_router(reviews.router, tags=["Reviews"])
app.include_router(status.router, tags=["Status"])


app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        os.environ.get("CORS_HOST", "http://localhost:3000")
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


connections = []


@app.websocket("/wss")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    connections.append(websocket)

    with pool.connection() as conn:
        with conn.cursor() as cur:
            cur.execute("""
                        SELECT
                         s.id,
                            s.user_id,
                            s.post_id,
                            s.condition,
                            s.foot_traffic,
                            s.is_open,
                            u.username,
                            p.title
                        FROM status as s
                            inner join posts as p on s.post_id = p.id
                                inner join users as u on s.user_id = u.id
                        """)
            status_list = cur.fetchall()
    while True:
        try:
            await websocket.receive_text()
            with pool.connection() as conn:
                with conn.cursor() as cur:
                    cur.execute("""
                        SELECT
                         s.id,
                            s.user_id,
                            s.post_id,
                            s.condition,
                            s.foot_traffic,
                            s.is_open,
                            u.username,
                            p.title
                        FROM status as s
                            inner join posts as p on s.post_id = p.id
                                inner join users as u on s.user_id = u.id
                        """)
            for connection in connections:
                await connection.send_json(status_list)
        except WebSocketDisconnect:
            connections.remove(websocket)
            break


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
