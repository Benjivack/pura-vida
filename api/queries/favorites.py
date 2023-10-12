from pydantic import BaseModel
from datetime import date
from queries.accounts import pool
from typing import List, Union


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

    def get_all(self) -> Union[List[FavoriteOut], Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT
                            id,
                            user_id,
                            post_id,
                            created_at
                        FROM favorites
                        ORDER BY id
                        """
                    )
                    result = []
                    for record in db:
                        favorite = FavoriteOut(
                            id=record[0],
                            user_id=record[1],
                            post_id=record[2],
                            created_at=record[3]

                        )
                        result.append(favorite)
                    return result
        except Exception as e:
            print(e)

    def delete(self, id: int) -> Union[None, Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        DELETE FROM favorites WHERE id = %s
                        """,
                        [id]
                    )
                    return True
        except Exception:
            return {"message": "could not delete user"}
