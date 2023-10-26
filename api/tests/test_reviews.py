from fastapi.testclient import TestClient
from main import app
from queries.reviews import ReviewRepository
from authenticator import authenticator
from queries.users import UserOut

client = TestClient(app)


class EmptyReviewRepository:
    def get_all(self):
        return []


class CreateReviewRepo:
    def create(self, review):

        result = {
            "id": 1,
            "body": "cool place",
            "rating": 1,
            "user_id": 1,
            "post_id": 1,
            "created_at": 1999-12-25
        }
        result.update(review)
        return result


def fake_get_current_account_data():
    return UserOut(id=1,
                   username="admin",
                   email="admin@gmail.com",
                   role="admin",
                   joined="2000-12-25")


def test_get_all_reviews():

    # Arrange

    app.dependency_overrides[ReviewRepository] = EmptyReviewRepository

    response = client.get("/api/review")

    # Act

    app.dependency_overrides = {}

    # Assert

    assert response.status_code == 200
    assert response.json() == []


def test_create_reviews():
    # Arrange
    app.dependency_overrides[
        authenticator.get_current_account_data
        ] = fake_get_current_account_data

    app.dependency_overrides[ReviewRepository] = CreateReviewRepo

    json = {
        "body": "cool place",
        "rating": 1,
        "user_id": 1,
        "post_id": 1,
        "created_at": "1999-12-25"
    }

    expected = {
            "id": 1,
            "body": "cool place",
            "rating": 1,
            "user_id": 1,
            "post_id": 1,
            "created_at": "1999-12-25"
        }

    # Act
    response = client.post("/api/review", json=json)
    app.dependency_overrides = {}

    # Assert
    assert response.status_code == 200
    assert response.json() == expected
