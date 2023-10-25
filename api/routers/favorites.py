from fastapi import APIRouter, Depends
from queries.favorites import (
    FavoriteIn,
    FavoritesRepository,
    Error,
    GetFavorites
)
from typing import Union, List

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


@router.get("/api/favorites", response_model=Union[List[GetFavorites], Error])
def get_all(
    repo: FavoritesRepository = Depends(),
    account_data: dict = Depends(
        authenticator.get_current_account_data
        )
):
    return repo.get_all()


@router.delete(
        "/api/favorites/{favorites_id}",
        response_model=Union[bool, Error]
)
def delete_favorite(
    favorites_id: int,
    favorites: FavoritesRepository = Depends(),
    account_data: dict = Depends(
        authenticator.get_current_account_data
        )
):
    return favorites.delete(favorites_id)
