# Data Model to create API using Psycopg and FastAPI

In our models, we used the Pydantic library to define the structure of each model.

## User Models
- UserIn : This is the structure for the data you send into the database to create a user.
- UserOut : This is the data you get back from the server.
- UserOutWithPassword : Used to convert a password into a hashed password for user login.

```
class Error(BaseModel):
    message: str


class UserDuplicateError(ValueError):
    pass


class UserIn(BaseModel):
    username: str
    password: str
    email: str
    role: str
    joined: date


class UserOut(BaseModel):
    id: int
    username: str
    email: str
    role: str
    joined: str


class UserOutWithPassword(UserOut):
    hashed_password: str
```


## Status Models
- StatusIn : The data you send to the server to create a status.
- StatusGetOut : The data you get back from a server after a get method is called.
- StatusOut : the data you get back from the server after a successful creation.


```
class Error(BaseModel):
    message: str


class StatusIn(BaseModel):
    user_id: int
    post_id: int
    condition: Optional[int]
    foot_traffic: Optional[int]
    is_open: int


class StatusGetOut(BaseModel):
    id: int
    user_id: int
    post_id: int
    condition: int
    foot_traffic: int
    is_open: int
    username: str
    title: str


class StatusOut(BaseModel):
    id: int
    user_id: int
    post_id: int
    condition: int
    foot_traffic: int
    is_open: int
```


## Reviews Model
- ReviewIn : Data you send to the server to create a review.
- ReviewGetOut : Data you get from the server after a get method is called.
- ReviewOut : Response data that the server sends back after the review is created.

```
class Error(BaseModel):
    message: str


class ReviewIn(BaseModel):
    body: str
    rating: int
    user_id: int
    post_id: int
    created_at: date


class ReviewGetOut(BaseModel):
    id: int
    body: str
    rating: int
    user_id: int
    post_id: int
    created_at: date
    username: str
    title: str


class ReviewOut(BaseModel):
    id: int
    body: str
    rating: int
    user_id: int
    post_id: int
    created_at: date
```


## Posts Models
- PostIn : Data you send to the server to create a post.
- PostOut : Response data the the server sends back after the review is created.
- GetPost : Data you get from the server after a get method is called.

```
class Error(BaseModel):
    message: str


class PostIn(BaseModel):
    title: str
    latitude: float
    longitude: float
    zipcode: str
    body: str
    created_by: int
    created_at: date


class PostOut(BaseModel):
    id: int
    title: str
    latitude: float
    longitude: float
    zipcode: str
    body: str
    created_by: int
    created_at: date


class GetPost(BaseModel):
    id: int
    title: str
    latitude: float
    longitude: float
    zipcode: str
    body: str
    created_by: int
    created_at: date
    author: str
```


## Favorites Models
- FavoriteIn : Data you send to the server to create a favorite.
- FavoriteOut : Response data from the server after a favorite is created.
- GetFavorites : Data you get from the server after a get method is called.

```
class Error(BaseModel):
    message: str


class FavoriteIn(BaseModel):
    user_id: int
    post_id: int
    created_at: date


class FavoriteOut(BaseModel):
    id: int
    user_id: int
    post_id: int
    created_at: date


class GetFavorites(BaseModel):
    id: int
    user_id: int
    post_id: int
    created_at: date
    title: str
```
