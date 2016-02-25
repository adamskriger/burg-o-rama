DROP TABLE IF EXISTS burgers;

CREATE TABLE burgers (
       id SERIAL UNIQUE PRIMARY KEY,
       burgerName TEXT,
       cheese TEXT
);
