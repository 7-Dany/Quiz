CREATE TABLE post_comments
(
    id          SERIAL PRIMARY KEY,
    post_id     BIGINT REFERENCES posts (id),
    comment_id  BIGINT REFERENCES comments (id),
    replying_to BIGINT REFERENCES users (id) NULL
)