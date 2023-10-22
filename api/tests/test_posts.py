from fastapi.testclient import TestClient
from main import app
from queries.posts import PostRepository
from authenticator import authenticator
from queries.users import UserOut

client = TestClient(app)


class EmptyPostRepository:
    def get_all(self):
        return []


class CreatePostRepo:
    def create(self, post):

        result = {
            "id": 1,
            "title": "cool place",
            "latitude": 5.55,
            "longitude": 6.65,
            "zipcode": 12345,
            "body": "Not as hot as hell",
            "created_by": 1,
            "created_at": 1999-12-25
        }
        result.update(post)
        return result


def fake_get_current_account_data():
    return UserOut(id=1,
                   username="admin",
                   email="admin@gmail.com",
                   role="admin",
                   joined="2000-12-25")


def test_get_all_posts():

    # Arrange

    app.dependency_overrides[PostRepository] = EmptyPostRepository

    response = client.get("/api/posts")

    # Act

    app.dependency_overrides = {}

    # Assert

    assert response.status_code == 200
    assert response.json() == []


def test_create_posts():
    # Arrange
    app.dependency_overrides[
        authenticator.get_current_account_data
        ] = fake_get_current_account_data

    app.dependency_overrides[PostRepository] = CreatePostRepo

    json = {
        "title": "cool place",
        "latitude": 5.55,
        "longitude": 6.65,
        "zipcode": '12345',
        "body": "Not as hot as hell",
        "created_by": 1,
        "created_at": '1999-12-25'
    }

    expected = {
            "id": 1,
            "title": "cool place",
            "latitude": 5.55,
            "longitude": 6.65,
            "zipcode": '12345',
            "body": "Not as hot as hell",
            "created_by": 1,
            "created_at": '1999-12-25'
        }

    # Act
    response = client.post("/api/posts", json=json)
    app.dependency_overrides = {}

    # Assert
    assert response.status_code == 200
    assert response.json() == expected
