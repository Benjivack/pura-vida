from fastapi import APIRouter, Depends
from queries.posts import PostIn, PostRepository, PostOut, Error
from typing import Union, List
from authenticator import authenticator

router = APIRouter()


@router.post("/api/posts")
def create_post(post: PostIn, repo: PostRepository = Depends()):
    return repo.create(post)


@router.get("/api/posts", response_model=Union[List[PostOut], Error])
def get_all(
    repo: PostRepository = Depends(),
):
    return repo.get_all()


@router.put('/api/posts/{post_id}', response_model=Union[PostOut, Error])
def update_post(
    post_id: int,
    post: PostIn,
    repo: PostRepository = Depends(),
    account_data: dict = Depends(
        authenticator.get_current_account_data
        ),
) -> Union[Error, PostOut]:
    return repo.update(post_id, post)


@router.get("/api/posts/{post_id}", response_model=Union[PostOut, Error])
def get_post_by_id(
    post_id: int,
    repo: PostRepository = Depends(),
):
    return repo.get_by_id(post_id)
