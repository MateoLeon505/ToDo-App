CREATE DATABASE todo_app;

USE todo_app;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255),
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(100)
);

CREATE TABLE todos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255),
    completed BOOLEAN DEFAULT false,
    user_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE 
);

CREATE TABLE shared_todos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    todo_id INT,
    user_id INT,
    shared_with_id INT,
    FOREIGN KEY (todo_id) REFERENCES todos(id),
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (shared_with_id) REFERENCES users(id)
);

-- INSERT USERS
INSERT INTO users (name, email, password) VALUES ('Mateo', 'nalao@gmail.com', 'asd123');
INSERT INTO users (name, email, password) VALUES ('Nala', 'nala@gmail.com', '123asd');

-- INSERT TODOS
INSERT INTO todos (title, user_id) VALUES ('📱 Make a project using React Native 🎯', 1);
INSERT INTO todos (title, user_id) VALUES ('🏃 Go Runing tomorrow ⚡', 2);
INSERT INTO todos (title, user_id) VALUES ('🧷 Make a project using Next.js 💻', 1);
INSERT INTO todos (title, user_id) VALUES ('🌐 Work on my portfolio 🖥️', 2);
INSERT INTO todos (title, user_id) VALUES ('⚽ Play soccer on the weekend ⚽', 1);
INSERT INTO todos (title, user_id) VALUES ('💪 Go to the gym 🏋️‍♂️', 2);
INSERT INTO todos (title, user_id) VALUES ('🍗 Make the dinner 🍮🍔', 1);
INSERT INTO todos (title, user_id) VALUES ('🎬 Watch a movie 🎥', 2);

-- SHARE TODO 1 OF USER 1 WITH USER 2
INSERT INTO shared_todos(todo_id, user_id, shared_with_id) VALUES(1, 1, 2);

-- GET TODOS INCLUDING SHARED TODOS BY ID
SELECT todos.*, shared_todos.shared_with_id 
FROM todos 
LEFT JOIN shared_todos ON todos.id = shared_todos.todo_id
WHERE todos.user_id = [user.id] OR shared_todos.shared_with_id = [user.id]