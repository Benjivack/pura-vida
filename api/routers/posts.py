from fastapi import APIRouter, Depends
from queries.posts import PostIn, PostRepository

router = APIRouter()


@router.post("/api/posts")
def create_post(post: PostIn, repo: PostRepository = Depends()):
    return repo.create(post)
