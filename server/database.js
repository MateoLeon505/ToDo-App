import mysql from "mysql2";
import dotenv from "dotenv";
dotenv.config();

const pool = mysql
  .createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
  })
  .promise();

// QUERYS
export const getTodosById = async (id) => {
  const [rows] = await pool.query(
    `SELECT todos.*, shared_todos.shared_with_id 
    FROM todos 
    LEFT JOIN shared_todos ON todos.id = shared_todos.todo_id
    WHERE todos.user_id = ? OR shared_todos.shared_with_id = ?`,
    [id, id]
  );
  return rows;
};

export const getTodo = async (id) => {
  const [row] = await pool.query(`SELECT * FROM todos WHERE id = ?`, [id]);
  return row[0];
};

export const getSharedToDoById = async (id) => {
  const [rows] = await pool.query(`SELECT * FROM shared_todos WHERE id = ?`, [
    id,
  ]);
  return rows[0];
};

export const getUserById = async (id) => {
  const [rows] = await pool.query(`SELECT * FROM users WHERE id = ?`, [id]);
  return rows[0];
};

export const getUserByEmail = async (email) => {
  const [rows] = await pool.query(`SELECT * FROM users WHERE email = ?`, [
    email,
  ]);
  return rows[0];
};

export const createTodo = async (user_id, title) => {
  const [result] = await pool.query(
    `INSERT INTO todos (user_id, title) VALUES (?, ?)`,
    [user_id, title]
  );
  const todoID = result.insertId;
  return getTodo(todoID);
};

export const deleteTodo = async (id) => {
  const [result] = await pool.query(`DELETE FROM todos WHERE id = ?;`, [id]);
  return result;
};

export const toggleCompleted = async (id, value) => {
  const newValue = value === true ? "TRUE" : "FALSE";
  const [result] = await pool.query(
    `UPDATE todos SET completed = ${newValue} WHERE id = ?`,
    [id]
  );
  return result;
};

export const sharedTodo = async (todo_id, user_id, shared_with_id) => {
  const [result] = await pool.query(
    `INSERT INTO shared_todos(todo_id, user_id, shared_with_id)
    VALUES(1, 1, 2);`
  );
  [todo_id, user_id, shared_with_id];
  return result.insertId;
};

