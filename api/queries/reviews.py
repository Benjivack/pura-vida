from pydantic import BaseModel
from datetime import date
from queries.accounts import pool


class Error(BaseModel):
    message: str


class ReviewIn(BaseModel):
    body: str
    rating: int
    user_id: int
    post_id: int
    created_at: date


class ReviewOut(BaseModel):
    id: int
    body: str
    rating: int
    user_id: int
    post_id: int
    created_at: date


class ReviewRepository:
    def create(self, reviews: ReviewIn):
        with pool.connection() as conn:
            with conn.cursor() as db:
                result = db.execute(
                    """
                    INSERT INTO reviews
                        (body,
                        rating,
                        user_id,
                        post_id,
                        created_at)
                    VALUES
                        (%s, %s, %s, %s, %s)
                    RETURNING id;
                    """,
                    [
                        reviews.body,
                        reviews.rating,
                        reviews.user_id,
                        reviews.post_id,
                        reviews.created_at
                    ]
                )
                id = result.fetchone()[0]
                old_data = reviews.dict()
                return ReviewOut(id=id, **old_data)
