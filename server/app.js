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
import cors from "cors";
 
const corsOptions = {
  origin: ["https://192.168.20.24:8081"],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
};

const app = express();
app.use(express.json());
app.use(cors(corsOptions));

//REQUESTS
app.get("/todos/:id", async (req, res) => {
  const todos = await getTodosById(req.params.id);
  res.status(200).send(todos);
});

app.get("/todos/shared_todos/:id", async (req, res) => {
  const todo = await getSharedToDoById(req.params.id);
  const author = await getTodo(todo.user_id);
  const shared_with = await getUserById(todo.shared_with_id);
  res.status(200).send({ author, shared_with });
});

app.get("/users/:id", async (req, res) => {
  const user = await getUserById(req.params.id);
  res.status(200).send(user);
});

app.put("/todos/:id", async (req, res) => {
  const { value } = req.body;
  const todo = await toggleCompleted(req.params.id, value);
  res.status(200).send(todo);
});

app.delete("/todos/:id", async (req, res) => {
  await deleteTodo(req.params.id);
  res.send({ message: "ToDo deleted successfully" });
});

app.post("/todos/shared_todos", async (req, res) => {
  const { todo_id, user_id, email } = req.body;
  const userToShare = await getUserByEmail(email);
  const shared_todo = await sharedTodo(todo_id, user_id, userToShare.id);
  res.status(201).send(shared_todo);
});

app.post("/todos", async (req, res) => {
  const { user_id, title } = req.body;
  const newTodo = await createTodo(user_id, title);
  res.status(201).send(newTodo);
});

app.listen(8080, () => {
  console.log("Server listening on port 8080");
});
