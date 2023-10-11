from pydantic import BaseModel
from datetime import date
from queries.accounts import pool
from typing import List, Union


class Error(BaseModel):
    message: str


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

    def get_all(self) -> Union[List[PostOut], Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT (
                            id,
                            title,
                            latitude,
                            longitude,
                            zipcode,
                            body,
                            created_by,
                            created_at
                        )
                        FROM posts
                        ORDER BY id
                        """
                    )
                    result = []
                    for record in db:
                        post = PostOut(
                            id=record[0],
                            title=record[1],
                            latitude=record[2],
                            longitude=record[3],
                            zipcode=record[4],
                            body=record[5],
                            created_by=record[6],
                            created_at=record[7]
                        )
                        result.append(post)
                    return result
        except Exception:
            return {"message": "could not get all posts"}
