CREATE TABLE comments
(
    id          SERIAL PRIMARY KEY,
    content     TEXT,
    score       INTEGER,
    created_at TIMESTAMP,
    user_id     BIGINT REFERENCES users (id)
)