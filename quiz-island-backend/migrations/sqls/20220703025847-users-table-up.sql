CREATE TABlE users
(
    id         SERIAL PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name  VARCHAR(50) NOT NULL,
    image      VARCHAR,
    email      VARCHAR     NOT NULL UNIQUE,
    password   VARCHAR     NOT NULL
);