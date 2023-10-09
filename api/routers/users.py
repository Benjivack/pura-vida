from fastapi import APIRouter, Depends, Response
from typing import Union, List
from queries.users import (
    Error,
    UserIn,
    UserRepository,
    UserOut,
    )


router = APIRouter()


@router.post("/api/users", response_model=Union[UserOut, Error])
def create_user(
    user: UserIn,
    response: Response,
    repo: UserRepository = Depends(),
):
    # response.status_code = 400
    return repo.create(user)


@router.get("/users", response_model=Union[List[UserOut], Error])
def get_all(
    repo: UserRepository = Depends(),
):
    return repo.get_all()
