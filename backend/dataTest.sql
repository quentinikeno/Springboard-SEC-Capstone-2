--createdb math_games_test if you haven't already
--then run psql < dataTest.sql

\c math_games_test

DROP TABLE IF EXISTS "challenges";
DROP TABLE IF EXISTS "friends";
DROP TABLE IF EXISTS "scores";
DROP TABLE IF EXISTS "games";
DROP TABLE IF EXISTS "users";

CREATE TABLE "users" (
    "id" serial PRIMARY KEY,
    "username" varchar(25) UNIQUE NOT NULL,
    "password" text NOT NULL,
    "email" varchar(50) UNIQUE NOT NULL,
    "join_at" timestamp without time zone NOT NULL,
    "last_login_at" timestamp with time zone,
    "is_admin" boolean NOT NULL
);

CREATE TABLE "friends" (
    "id" serial PRIMARY KEY,
    "user_1_id" int NOT NULL REFERENCES "users" ("id") ON DELETE CASCADE,
    "user_2_id" int NOT NULL REFERENCES "users" ("id") ON DELETE CASCADE,
    "accepted" boolean NOT NULL,
    UNIQUE ("user_1_id","user_2_id")
);

CREATE TABLE "games" (
    "id" serial PRIMARY KEY,
    "name" text UNIQUE NOT NULL
);

CREATE TABLE "scores" (
    "id" serial PRIMARY KEY,
    "game_id" int NOT NULL REFERENCES "games" ("id") ON DELETE CASCADE,
    "user_id" int NOT NULL REFERENCES "users" ("id") ON DELETE CASCADE,
    "high_score" int NOT NULL,
    UNIQUE ("game_id","user_id")
);

CREATE TABLE "challenges" (
    "id" serial PRIMARY KEY,
    "friends_id" int NOT NULL REFERENCES "friends" ("id") ON DELETE CASCADE,
    "game_id" int NOT NULL REFERENCES "games" ("id") ON DELETE CASCADE,
    "score_to_beat" int NOT NULL
);