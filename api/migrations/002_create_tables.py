steps = [
    [
        """
        CREATE TABLE users (
            id SERIAL PRIMARY KEY NOT NULL,
            username VARCHAR(10) NOT NULL,
            password VARCHAR(20) NOT NULL,
            email VARCHAR(50) NOT NULL,
            role VARCHAR(9) NOT NULL,
            joined TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
        );
        """,
        """
        DROP TABLE users;
        """
    ]
]
