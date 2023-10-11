from fastapi import APIRouter, Depends
from queries.favorites import FavoriteIn, FavoritesRepository

from authenticator import authenticator

router = APIRouter()


@router.post("/api/favorites")
def create_favorite(
    favorite: FavoriteIn,
    repo: FavoritesRepository = Depends(),
    account_data: dict = Depends(
        authenticator.get_current_account_data
        )
):
    return repo.create(favorite)
