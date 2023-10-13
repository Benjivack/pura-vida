from pydantic import BaseModel
from datetime import date
from queries.accounts import pool
from typing import List, Union


class Error(BaseModel):
    message: str


class UserDuplicateError(ValueError):
    pass


class UserIn(BaseModel):
    username: str
    password: str
    email: str
    role: str
    joined: date


class UserOut(BaseModel):
    id: int
    username: str
    email: str
    role: str
    joined: str


class UserOutWithPassword(UserOut):
    hashed_password: str


class UserRepository:
    def get_all(self) -> Union[List[UserOut], Error]:
        try:
            with pool.connection() as conn:

                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT id, username, email, role, joined
                        FROM users
                        ORDER BY joined;
                        """
                    )
                    result = []
                    for record in db:
                        user = UserOut(
                                id=record[0],
                                username=record[1],
                                email=record[2],
                                role=record[3],
                                joined=str(record[4]),
                        )
                        result.append(user)
                    return result
        except Exception:
            return {"message": "could not get all users"}

    def create(self, user: UserIn,
               hashed_password: str) -> UserOutWithPassword:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        INSERT INTO users
                            (username, hashed_password, email, role, joined)
                        VALUES
                            (%s, %s, %s, %s, %s)
                        RETURNING *;
                        """,
                        [
                            user.username,
                            hashed_password,
                            user.email,
                            user.role,
                            user.joined
                        ]
                    )
                    print('RESULT ID: ', result)
                    user = result.fetchone()
                    return UserOutWithPassword(
                            id=user[0],
                            username=user[1],
                            hashed_password=user[2],
                            email=user[3],
                            role=user[4],
                            joined=str(user[5])
                        )
        except Exception:
            return {"message": "no create user"}

    def get(self, username: str):
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT id, username,
                        hashed_password, email, role, joined
                        FROM users WHERE username = %s
                        """,
                        [
                            username
                        ]
                    )
                    user = result.fetchone()
                    return UserOutWithPassword(
                        id=user[0],
                        username=user[1],
                        hashed_password=user[2],
                        email=user[3],
                        role=user[4],
                        joined=str(user[5])
                    )
        except Exception:
            return {'message': 'pick a different username'}

    def get_specific_user(self,
                          username: str) -> Union[UserOutWithPassword, Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT id, username,
                        hashed_password, email, role, joined
                        FROM users WHERE username = %s
                        """,
                        [username]
                    )
                    user = result.fetchone()
                    if user is None:
                        return Error(message='User not found')
                    return UserOutWithPassword(
                        id=user[0],
                        username=user[1],
                        hashed_password=user[2],
                        email=user[3],
                        role=user[4],
                        joined=str(user[5])
                    )
        except Exception as e:
            return Error(message=str(e))

    def delete(self, username: str):
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        DELETE FROM users WHERE username = %s
                        """,
                        [
                            username
                        ]
                    )
                    return True
        except Exception:
            return {'message': 'Error deleting user'}
