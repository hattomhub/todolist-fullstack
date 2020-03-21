CREATE DATABASE fullstacktodo;

CREATE TABLE todo (
    todo_id SERIAL PRIMARY KEY,
    todo_description VARCHAR(255)
);