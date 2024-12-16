CREATE USER docker;
CREATE DATABASE drogon;
GRANT ALL PRIVILAGES ON DATABASE drogon TO docker;

CREATE TABLE IF NOT EXISTS users (
    id          TEXT PRIMARY KEY,
    email       TEXT UNIQUE,
    password    TEXT
);