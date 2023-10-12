from pydantic import BaseModel
from datetime import date
from queries.accounts import pool
from typing import List, Union


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

    def get_all(self) -> Union[List[ReviewOut], Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT
                            id,
                            body,
                            rating,
                            user_id,
                            post_id,
                            created_at

                        FROM reviews
                        ORDER BY created_at
                        """
                    )
                    result = []
                    for record in db:
                        review = ReviewOut(
                            id=record[0],
                            body=record[1],
                            rating=record[2],
                            user_id=record[3],
                            post_id=record[4],
                            created_at=record[5]
                        )
                        result.append(review)
                    return result
        except Exception:
            return {"message": "could not get all reviews"}

    def get_by_id(self, post_id: int):
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        SELECT
                            id,
                            body,
                            rating,
                            user_id,
                            post_id,
                            created_at
                        FROM reviews
                        WHERE post_id = %s
                        """,
                        [post_id]
                    )
                    record = db.fetchall()
                    print(record)
                    if record is None:
                        return {"message": "Post not found"}
                    rec = []
                    for r in record:
                        review = ReviewOut(
                            id=r[0],
                            body=r[1],
                            rating=r[2],
                            user_id=r[3],
                            post_id=r[4],
                            created_at=r[5]
                        )
                        rec.append(review)
                    return rec
        except Exception:
            return {"message": "Could not get review by id"}

    def delete(self, id: int) -> Union[None, Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        DELETE FROM reviews WHERE id = %s
                        """,
                        [id]
                    )
                    return True
        except Exception:
            return {"message": "could not delete review"}
