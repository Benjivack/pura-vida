from fastapi import APIRouter, Depends
from queries.users import UserIn, UserRepository


router = APIRouter()


@router.post("/api/users")
def create_user(user: UserIn, repo: UserRepository = Depends()):
    return repo.create(user)
