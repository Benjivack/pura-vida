from pydantic import BaseModel
from queries.accounts import pool
from typing import Optional


class StatusIn(BaseModel):
    user_id: int
    post_id: int
    condition: Optional[int]
    foot_traffic: Optional[int]
    is_open: int


class StatusOut(BaseModel):
    id: int
    user_id: int
    post_id: int
    condition: int
    foot_traffic: int
    is_open: int


class StatusRepository:
    def create_status(self, status: StatusIn):
        with pool.connection() as conn:
            with conn.cursor() as db:
                result = db.execute(
                    """
                    INSERT INTO status
                    (user_id,
                    post_id,
                    condition,
                    foot_traffic,
                    is_open)
                    VALUES
                    (%s, %s, %s, %s, %s)
                    RETURNING id
                    """,
                    [
                        status.user_id,
                        status.post_id,
                        status.condition,
                        status.foot_traffic,
                        status.is_open
                    ]
                )
                id = result.fetchone()[0]
                old_data = status.dict()
                return StatusOut(id=id, **old_data)
