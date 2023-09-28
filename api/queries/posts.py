from pydantic import BaseModel
from datetime import date
from queries.accounts import pool


class PostIn(BaseModel):
    title: str
    latitude: float
    longitude: float
    zipcode: str
    body: str
    created_by: int
    created_at: date


class PostOut(BaseModel):
    id: int
    title: str
    latitude: float
    longitude: float
    zipcode: str
    body: str
    created_by: int
    created_at: date


class PostRepository:
    def create(self, posts: PostIn):
        with pool.connection() as conn:
            with conn.cursor() as db:
                result = db.execute(
                    """
                    INSERT INTO posts
                        (title,
                        latitude,
                        longitude,
                        zipcode,
                        body,
                        created_by,
                        created_at)
                    VALUES
                        (%s, %s, %s, %s, %s, %s, %s)
                    RETURNING id;
                    """,
                    [
                        posts.title,
                        posts.latitude,
                        posts.longitude,
                        posts.zipcode,
                        posts.body,
                        posts.created_by,
                        posts.created_at
                    ]
                )
                print('RESULT ID: ', result)
                id = result.fetchone()[0]
                old_data = posts.dict()
                return PostOut(id=id, **old_data)
