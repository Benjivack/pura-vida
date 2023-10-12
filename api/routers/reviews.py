from fastapi import APIRouter, Depends
from queries.reviews import ReviewIn, ReviewRepository, ReviewOut, Error
from typing import Union, List
from authenticator import authenticator

router = APIRouter()


@router.post("/api/review")
def create_review(
    review: ReviewIn,
    repo: ReviewRepository = Depends(),
    account_data: dict = Depends(
        authenticator.get_current_account_data
        )
):
    return repo.create(review)


@router.get("/api/review", response_model=Union[List[ReviewOut], Error])
def get_all(
    repo: ReviewRepository = Depends(),
):
    return repo.get_all()


@router.get(
        "/api/Review/{post_id}", response_model=Union[List[ReviewOut], Error]
)
def get_review_by_id(
    post_id: int,
    repo: ReviewRepository = Depends(),
):
    return repo.get_by_id(post_id)
