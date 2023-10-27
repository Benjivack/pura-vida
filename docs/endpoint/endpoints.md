## Endpoints:

* 1. Login
* 2. Logout
* 3. Signup
* 4. Get current user
* 5. Delete user
* 6. Get all posts
* 7. Create post
* 8. Get specific post
* 9. Update post
* 10. Delete post
* 11. Get all favorites
* 12. Create favorite
* 13. Delete favorite
* 14. Get all reviews
* 15. Create review
* 16. Get specific review
* 17. Delete review
* 18. Create status
* 19. Update status
* 20. Delete status
* 21. Get all statuses

## Login:

Endpoint path: /token
Endpoint method: POST

Request body:

![Alt text](image.png)

Response example:

![Alt text](image-1.png)

## Logout:

Endpoint path: /token

Endpoint method: DELETE

Reponse example:

![Alt text](image-2.png)

## Signup:

Endpoint path: /api/users

Endpoint method: POST

Request body:

![Alt text](image-3.png)

Reponse example:

![Alt text](image-4.png)

## Get current user:

Endpoint path: /api/user

Endpoint method: GET

Reponse example:

![Alt text](image-5.png)

## Delete user:

Endpoint path: api/users/{username}

Endpoint method: DELETE

Request body:

![Alt text](image-6.png)

Reponse example:

![Alt text](image-7.png)

## Get all posts:

Endpoint path: api/posts

Endpoint method: GET

Reponse example:

![Alt text](image-8.png)

## Create post:

Endpoint path: /api/posts

Endpoint method: POST

Request body:

![Alt text](image-9.png)

Reponse example:

![Alt text](image-10.png)

## Get specific post:

Endpoint path: /api/posts/{post_id}

Endpoint method: GET

Request body:

![Alt text](image-11.png)

Reponse example:

![Alt text](image-12.png)

## Update post:

Endpoint path: /api/posts/{post_id}

Endpoint method: PUT

Request body:

![Alt text](image-13.png)

Reponse example:

![Alt text](image-15.png)

## Delete post:

Endpoint path: /api/posts/{post_id}

Endpoint method: DELETE

Request body:

![Alt text](image-16.png)

Reponse example:

![Alt text](image-17.png)

## Get all favorites:

Endpoint path: /api/favorites

Endpoint method: GET

Reponse example:

![Alt text](image-18.png)

## Create favorite:

Endpoint path: /api/favorites

Endpoint method: POST

Request body:

![Alt text](image-19.png)

Reponse example:

![Alt text](image-20.png)

## Delete favorite:

Endpoint path: /api/favorites/{favorites_id}

Endpoint method: DELETE

Request body:

![Alt text](image-21.png)

Reponse example:

![Alt text](image-22.png)

## Get all reviews:

Endpoint path: /api/review

Endpoint method: GET

Reponse example:

![Alt text](image-23.png)

## Create review:

Endpoint path: /api/review

Endpoint method: POST

Request body:

![Alt text](image-24.png)

Reponse example:

![Alt text](image-25.png)

## Get specific review:

Endpoint path: /api/review/{post_id}

Endpoint method: GET

Request body:

![Alt text](image-26.png)

Reponse example:

![Alt text](image-27.png)

## Delete review:

Endpoint path: api/review/{review_id}

Endpoint method: DELETE

Request body:

![Alt text](image-28.png)

Reponse example:

![Alt text](image-29.png)

## Create status:

Endpoint path: /api/status

Endpoint method: POST

Request body:

![Alt text](image-30.png)

Reponse example:

![Alt text](image-31.png)

## Update status:

Endpoint path: /api/status/{status_id}

Endpoint method: PUT

Request body:

![Alt text](image-32.png)

Reponse example:

![Alt text](image-33.png)

## Delete status:

Endpoint path: /api/status/{status_id}

Endpoint method: DELETE

Request body:

![Alt text](image-34.png)

Reponse example:

![Alt text](image-35.png)

## Get all statuses:

Endpoint path: api/status/{post_id}

Endpoint method: GET

Request body:

![Alt text](image-36.png)

Reponse example:

![Alt text](image-37.png)
