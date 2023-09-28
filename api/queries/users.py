from pydantic import BaseModel
from datetime import date
from queries.accounts import pool


class UserIn(BaseModel):
    username: str
    password: str
    email: str
    role: str
    joined: date


class UserOut(BaseModel):
    id: int
    username: str
    password: str
    email: str
    role: str
    joined: date


class UserRepository:
    def create(self, user: UserIn):
        with pool.connection() as conn:
            with conn.cursor() as db:
                result = db.execute(
                    """
                    INSERT INTO users
                        (username, password, email, role, joined)
                    VALUES
                        (%s, %s, %s, %s, %s)
                    RETURNING id;
                    """,
                    [
                        user.username,
                        user.password,
                        user.email,
                        user.role,
                        user.joined
                    ]
                )
                print('RESULT ID: ', result)
                id = result.fetchone()[0]
                old_data = user.dict()
                return UserOut(id=id, **old_data)
