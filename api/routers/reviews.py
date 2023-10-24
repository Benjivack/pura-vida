from fastapi import APIRouter, Depends
from queries.reviews import ReviewIn, ReviewRepository, ReviewOut, Error
from queries.reviews import ReviewGetOut
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
        "/api/review/{post_id}", response_model=Union[
            List[ReviewGetOut], Error
        ]
)
def get_review_by_id(
    post_id: int,
    repo: ReviewRepository = Depends(),
):
    return repo.get_by_id(post_id)


@router.delete(
        "/api/review/{review_id}",
        response_model=Union[bool, Error]
)
def delete_review(
    review_id: int,
    reviews: ReviewRepository = Depends(),
):
    return reviews.delete(review_id)
