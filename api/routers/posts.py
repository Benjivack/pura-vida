from fastapi import APIRouter, Depends
from queries.posts import PostIn, PostRepository, PostOut, Error
from typing import Union, List

router = APIRouter()


@router.post("/api/posts")
def create_post(post: PostIn, repo: PostRepository = Depends()):
    return repo.create(post)


@router.get("/api/posts", response_model=Union[List[PostOut], Error])
def get_all(
    repo: PostRepository = Depends(),
):
    return repo.get_all()
