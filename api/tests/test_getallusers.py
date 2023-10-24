from fastapi.testclient import TestClient
from main import app
from queries.users import UserRepository
from authenticator import authenticator
from queries.users import UserOut

client = TestClient(app)


class EmptyUserRepository:
    def get_all(self):
        return []


def fake_get_current_account_data():
    return UserOut(id=1,
                   username="admin",
                   email="admin@gmail.com",
                   role="admin",
                   joined="2000-12-25")


def test_get_all_users():
    app.dependency_overrides[UserRepository] = EmptyUserRepository
    app.dependency_overrides[
        authenticator.get_current_account_data
        ] = fake_get_current_account_data

    response = client.get("/users")

    app.dependency_overrides = {}

    assert response.status_code == 200
    assert response.json() == []
