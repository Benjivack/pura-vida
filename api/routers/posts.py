from fastapi import APIRouter, Depends, status, Response
from queries.posts import PostIn, PostRepository, PostOut, Error, GetPost
from typing import Union, List
from authenticator import authenticator

router = APIRouter()


@router.post("/api/posts")
def create_post(
    post: PostIn,
    repo: PostRepository = Depends(),
    account_data: dict = Depends(
        authenticator.get_current_account_data
        )
        ):
    return repo.create(post)


@router.get("/api/posts", response_model=Union[List[GetPost], Error])
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


@router.get("/api/posts/{post_id}", response_model=Union[GetPost, Error])
def get_post_by_id(
    post_id: int,
    response: Response,
    repo: PostRepository = Depends()

):
    result = repo.get_by_id(post_id)
    if result is None:
        response.status_code = status.HTTP_404_NOT_FOUND
        return {"message": "Post not found"}
    return result


@router.delete(
        "/api/posts/{post_id}",
        response_model=Union[bool, Error]
)
def delete_post(
    post_id: int,
    post: PostRepository = Depends(),
    account_data: dict = Depends(
        authenticator.get_current_account_data
        )
):
    return post.delete(post_id)
