from fastapi import APIRouter, Depends
from queries.status import StatusIn, StatusRepository
from authenticator import authenticator

router = APIRouter()


@router.post("/api/status")
def create_status(
    status: StatusIn,
    repo: StatusRepository = Depends(),
    account_data: dict = Depends(
        authenticator.get_current_account_data
        )
        ):
    return repo.create_status(status)
