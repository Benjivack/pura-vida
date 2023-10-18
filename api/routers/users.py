from fastapi import (
    APIRouter,
    Depends,
    Response,
    Request,
    HTTPException,
    status,
)
from typing import Union, List
from queries.users import (
    Error,
    UserIn,
    UserRepository,
    UserOut,
    UserDuplicateError,
)


from jwtdown_fastapi.authentication import Token
from authenticator import authenticator

from pydantic import BaseModel


class AccountForm(BaseModel):
    username: str
    password: str


class AccountToken(Token):
    account: UserOut


class HttpError(BaseModel):
    detail: str


router = APIRouter()


@router.get("/token", response_model=AccountToken | None)
async def get_token(
    request: Request,
    account: UserOut = Depends(authenticator.try_get_current_account_data)
) -> AccountToken | None:
    if account and authenticator.cookie_name in request.cookies:
        return {
            "access_token": request.cookies[authenticator.cookie_name],
            "type": "Bearer",
            "account": account,
        }


@router.post("/api/users", response_model=AccountToken | HttpError)
async def create_user(
    user: UserIn,
    request: Request,
    response: Response,
    users: UserRepository = Depends(),
):
    hashed_password = authenticator.hash_password(user.password)
    try:
        account = users.create(user, hashed_password)
    except UserDuplicateError:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Cannot create an account with those credentials",
        )
    form = AccountForm(username=user.username, password=user.password)
    token = await authenticator.login(response, request, form, users)
    return AccountToken(account=account, **token.dict())
    # response.status_code = 400
    # return users.create(user)


@router.get("/users", response_model=Union[List[UserOut], Error])
def get_all(
    repo: UserRepository = Depends(),
):
    return repo.get_all()


@router.get("/api/user", response_model=Union[UserOut, Error])
def get_current_user(
    account_data: dict = Depends(
        authenticator.get_current_account_data
        ),
    repo: UserRepository = Depends(),
):
    if isinstance(repo, Error):
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=repo.message,
        )
    return account_data


@router.get("/api/users/{username}", response_model=Union[UserOut, Error])
def get_user(
    username: str,
    users: UserRepository = Depends(),
):
    user = users.get_specific_user(username)
    if isinstance(user, Error):
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=user.message,
        )
    return user


@router.delete("/api/users/{username}", response_model=Union[bool, Error])
async def delete_user(
    username: str,
    users: UserRepository = Depends(),
):
    return users.delete(username)
