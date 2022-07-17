CREATE TABLE posts
(
    id SERIAL PRIMARY KEY ,
    content TEXT,
    user_id BIGINT REFERENCES users(id),
    create_at TIMESTAMP,
    score INTEGER
)