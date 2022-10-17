--createdb math_games_test if you haven't already
--then run psql < dataTest.sql

\c math_games_test

DROP TABLE IF EXISTS "Friends_Challenges";
DROP TABLE IF EXISTS "Friends";
DROP TABLE IF EXISTS "User_Games";
DROP TABLE IF EXISTS "Games";
DROP TABLE IF EXISTS "User";

CREATE TABLE "User" (
    "ID" serial PRIMARY KEY,
    "Username" varchar(25) UNIQUE NOT NULL,
    "Password" text NOT NULL,
    "Email" varchar(50) UNIQUE NOT NULL
);

CREATE TABLE "Friends" (
    "User_1_ID" int NOT NULL,
    "User_2_ID" int NOT NULL,
    "Accepted" boolean NOT NULL,
    "Blocked" boolean NOT NULL,
    PRIMARY KEY ("User_1_ID","User_2_ID"),
    CONSTRAINT "fk_Friends_User_1_ID" 
        FOREIGN KEY("User_1_ID")
            REFERENCES "User" ("ID") 
            ON DELETE CASCADE,
    CONSTRAINT "fk_Friends_User_2_ID"
        FOREIGN KEY("User_2_ID")
            REFERENCES "User" ("ID") 
            ON DELETE CASCADE
);

CREATE TABLE "Games" (
    "ID" serial PRIMARY KEY,
    "Name" text UNIQUE NOT NULL
);

CREATE TABLE "User_Games" (
    "Game_ID" int   NOT NULL,
    "User_ID" int   NOT NULL,
    "High_Score" int   NOT NULL,
    CONSTRAINT "fk_User_Games_Game_ID" 
        FOREIGN KEY("Game_ID")
            REFERENCES "Games" ("ID") 
            ON DELETE CASCADE,
    CONSTRAINT "fk_User_Games_User_ID" 
        FOREIGN KEY("User_ID")
            REFERENCES "User" ("ID") 
            ON DELETE CASCADE
);

CREATE TABLE "Friends_Challenges" (
    "ID" serial PRIMARY KEY,
    "User_1_ID" int NOT NULL,
    "User_2_ID" int NOT NULL,
    "Game_ID" int NOT NULL,
    "Score_To_Beat" int,
    CONSTRAINT "fk_Friends_Challenges_User_1_ID_User_2_ID" 
        FOREIGN KEY("User_1_ID", "User_2_ID")
            REFERENCES "Friends" ("User_1_ID", "User_2_ID") 
            ON DELETE CASCADE,
    CONSTRAINT "fk_Friends_Challenges_Game_ID" 
        FOREIGN KEY("Game_ID")
            REFERENCES "Games" ("ID")
            ON DELETE CASCADE
);