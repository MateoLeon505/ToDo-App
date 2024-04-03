import express from "express";
import {
  getTodosById,
  getTodo,
  getSharedToDoById,
  getUserById,
  getUserByEmail,
  createTodo,
  deleteTodo,
  toggleCompleted,
  sharedTodo,
} from "./database.js";

const app = express();
app.use(express.json());

//REQUESTS
app.get("/todos/:id", async (req, res) => {
    const todos = await getTodosById(req)
});

app.listen(8000, () => {
  console.log("Server listening on port 8000");
});
