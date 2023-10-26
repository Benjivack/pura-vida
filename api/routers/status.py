from fastapi import APIRouter, Depends
from queries.status import (StatusIn,
                            StatusRepository,
                            StatusOut,
                            StatusGetOut,
                            Error)
from authenticator import authenticator
from typing import List, Union

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


@router.put("/api/status/{status_id}", response_model=Union[StatusOut, Error])
def update_status(
    status_id: int,
    status: StatusIn,
    repo: StatusRepository = Depends(),
    account_data: dict = Depends(
        authenticator.get_current_account_data
        )
) -> Union[StatusOut, Error]:
    return repo.update(status_id, status)


@router.get("/api/status/{post_id}",
            response_model=Union[List[StatusGetOut], Error])
def get_all(
    post_id: int,
    repo: StatusRepository = Depends(),
):
    return repo.get_all(post_id)


@router.delete(
        "/api/status/{status_id}",
        response_model=Union[bool, Error]
)
def delete_status(
    status_id: int,
    status: StatusRepository = Depends(),
):
    return status.delete(status_id)


@router.get("/api/status",
            response_model=Union[List[StatusGetOut], Error])
def get_every(
    repo: StatusRepository = Depends(),
):
    return repo.get_every()
