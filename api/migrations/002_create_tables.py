steps = [
    [
        """
        CREATE TABLE users (
            id SERIAL PRIMARY KEY NOT NULL,
            username VARCHAR(10) NOT NULL UNIQUE,
            password VARCHAR(20) NOT NULL,
            email VARCHAR(50) NOT NULL UNIQUE,
            role VARCHAR(9) NOT NULL,
            joined TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
        );
        """,
        """
        DROP TABLE users;
        """
    ],

    [
        """
        CREATE TABLE posts (
            id SERIAL PRIMARY KEY NOT NULL,
            title VARCHAR (100) NOT NULL,
            latitude DECIMAL (9,6) NOT NULL,
            longitude DECIMAL (9,6) NOT NULL,
            zipcode NUMERIC (5) NOT NULL,
            body TEXT NOT NULL,
            created_by INTEGER REFERENCES users NOT NULL,
            created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
        );
        """,
        """
        DROP TABLE posts;
        """
    ]
]
