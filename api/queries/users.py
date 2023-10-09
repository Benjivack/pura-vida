from pydantic import BaseModel
from datetime import date
from queries.accounts import pool
from typing import List, Union


class Error(BaseModel):
    message: str


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
    def get_all(self) -> Union[Error, List[UserOut]]:
        try:
            with pool.connection() as conn:

                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT id, username, password, email, role, joined
                        FROM users
                        ORDER BY joined;
                        """
                    )
                    result = []
                    for record in db:
                        user = UserOut(
                                id=record[0],
                                username=record[1],
                                password=record[2],
                                email=record[3],
                                role=record[4],
                                joined=record[5],
                        )
                        result.append(user)
                    return result
        except Exception:
            return {"message": "could not get all users"}

    def create(self, user: UserIn):
        try:
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
        except Exception:
            return {"message": "no create user"}
