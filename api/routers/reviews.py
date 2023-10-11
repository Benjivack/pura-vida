from fastapi import APIRouter, Depends
from queries.reviews import ReviewIn, ReviewRepository

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
