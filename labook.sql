-- Active: 1675772586537@@127.0.0.1@3306


CREATE TABLE users(

    id TEXT PRIMARY KEY UNIQUE NOT NULL, 
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    password TEXT NOT NULL,
    role TEXT NOT NULL,
    created_at TEXT DEFAULT(DATETIME()) NOT NULL

);



INSERT INTO users(id, name, email, password, role)
VALUES
    ("u01", "gabriella", "gabriella@labenu.com", "gabriella123", "NORMAL"),
    ("u02", "vinicius", "vinicius@labenu.com", "vinicius123", "NORMAL"),
    ("u03", "vitoria", "vitoria@labenu.com", "vitoria123", "NORMAL");


CREATE TABLE posts(

    id  TEXT PRIMARY KEY UNIQUE NOT NULL, 
    creator_id TEXT NOT NULL,
    content TEXT NOT NULL,
    likes INTEGER DEFAULT (0) NOT NULL,
    dislikes INTEGER DEFAULT (0) NOT NULL,
    created_at TEXT DEFAULT(DATETIME()) NOT NULL,
    update_at TEXT DEFAULT(DATETIME()) NOT NULL,
    Foreign Key (creator_id) REFERENCES users(id) 
        ON DELETE CASCADE
        ON UPDATE CASCADE



);


INSERT INTO posts(id, creator_id, content)
VALUES
    ("p01", "u01", "Hoje aprendi JAVA!"),
    ("p02", "u02", "Hoje aprendi sobre arquitetura de software"),
    ("p03", "u03", "Me dei uma folguinha! :)");





CREATE TABLE like_dislikes(

    user_id TEXT NOT NULL,
    post_id TEXT NOT NULL, 
    like INTEGER NOT NULL,
    Foreign Key (user_id) REFERENCES users(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    Foreign Key (post_id) REFERENCES posts(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE


);



INSERT INTO like_dislikes(user_id, post_id, like)
VALUES
    ("u01", "p03", 1),
    ("u02", "p01", 1),
    ("u03", "p02", 1),
    ("u02", "p03", 0);

SELECT * FROM users;



