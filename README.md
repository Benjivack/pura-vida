# Pura Vida

- Brian La
- Ben Litvack
- Zac McClarnon
- Chris Cohen

  Pura Vida - An outdoor activity application where users are able to create "Posts", a representation of an outdoor activity zone such as hiking trails. Users can post a live status update on the trail condition, foot traffic, and even whether the trail is open or not. Additional user features include the ability to select favorites and leave reviews as well.

---

### Design

- [Wireframe](docs/wireframe/wireframe.md)
- [API Design](docs/endpoint/endpoints.md)
- [Data Models](docs/DataModels.MD)
- [Unit Tests](docs/unittests.md)

---

### Intended Users

- An application perfect for avid outdoors people, or for people who are curious about expanding their horizons and just pura vida

---

### Functionality

- Non-registered users are able to view a list of recently created Posts, as well as view the most recent statuses of a Post.
- In order to access the following features one must register for an account
  - Add a Post
  - Create a Status for any Post
  - Register a Post as a Favorite
  - Create a Review for a Post
  - Update any Post, Status, or Review they have created
  - Delete any previous Reviews, Posts, or Statuses they have created

---

### Initialization

To fully enjoy this application on your local machine, please make sure to follow these steps:

1. Clone this repository to your local machine
2. CD into the new project directory
3. Run `docker volume create postgres-data`
4. Run `docker-compose build`
5. Run `docker-compose up`
6. Head on over to `localhost:3000` and remember: Pura Vida
