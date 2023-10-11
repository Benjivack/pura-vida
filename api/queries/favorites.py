from pydantic import BaseModel
from datetime import date
from queries.accounts import pool


class Error(BaseModel):
    message: str


class FavoriteIn(BaseModel):
    user_id: int
    post_id: int
    created_at: date


class FavoriteOut(BaseModel):
    id: int
    user_id: int
    post_id: int
    created_at: date


class FavoritesRepository:
    def create(self, favorites: FavoriteIn):
        with pool.connection() as conn:
            with conn.cursor() as db:
                result = db.execute(
                    """
                    INSERT INTO favorites
                        (user_id,
                        post_id,
                        created_at)
                    VALUES
                        (%s, %s, %s)
                    RETURNING id;
                    """,
                    [
                        favorites.user_id,
                        favorites.post_id,
                        favorites.created_at
                    ]
                )
                id = result.fetchone()[0]
                old_data = favorites.dict()
                return FavoriteOut(id=id, **old_data)
