
-- Up
CREATE TABLE Person (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    email TEXT,
    password TEXT
    snippetId INTEGER REFERENCES Snippet(id)
);

CREATE TABLE Snippet (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT,
    text TEXT,
    ownerId INTEGER REFERENCES Person(id)
);

-- Down
DROP TABLE Person;
DROP TABLE Snippet;