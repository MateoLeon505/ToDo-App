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
  origin: "http://127.0.0.1:5173",
  methods: ["POST", "GET"],
  credentials: true,
};

const app = express();
app.use(express.json());
app.use(cors(corsOptions));

//REQUESTS
app.get("/todos/:id", async (req, res) => {
  const todoId = req.params.id;
  try {
    const todos = await getTodosById(todoId);
    res.status(200).send(todos);
  } catch (error) {
    res.status(400).send(`Error al obtener tareas: ${error.message}`);
  }
});

app.get("/todos/shared_todos/:id", async (req, res) => {
  const todoId = req.params.id;
  try {
    const todo = await getSharedToDoById(todoId);
    const author = await getTodo(todo.user_id);
    const shared_with = await getUserById(todo.shared_with_id);
    res.status(200).send({ author, shared_with });
  } catch (error) {
    res.status(400).send(`Error al obtener tareas: ${error.message}`);
  }
});

app.get("/users/:id", async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await getUserById(userId);
    res.status(200).send(user);
  } catch (error) {
    res.status(400).send(`Error al obtener usuario: ${error.message}`);
  }
});

app.put("/todos/:id", async (req, res) => {
  const todoId = req.params.id;
  const { value } = req.body;
  try {
    const todo = await toggleCompleted(todoId, value);
    res.status(200).send(todo);
  } catch (error) {
    res.status(400).send(`Error al actualizar tarea: ${error.message}`);
  }
});

app.delete("/todos/:id", async (req, res) => {
  const toDoToDelete = req.params.id;
  try {
    await deleteTodo(toDoToDelete);
    res.send({ message: "ToDo deleted successfully" });
  } catch (error) {
    res.status(400).send(`Error al eliminar tarea: ${error.message}`);
  }
});

app.post("/todos/shared_todos", async (req, res) => {
  const { todo_id, user_id, email } = req.body;
  try {
    const userToShare = await getUserByEmail(email);
    const shared_todo = await sharedTodo(todo_id, user_id, userToShare.id);
    res.status(201).send(shared_todo);
  } catch (error) {
    res.status(400).send(`Error al compartir tarea: ${error.message}`);
  }
});

app.post("/todos", async (req, res) => {
  const { user_id, title } = req.body;
  try {
    const newTodo = await createTodo(user_id, title);
    res.status(201).send(newTodo);
  } catch (error) {
    res.status(400).send(`Error al crear nueva tarea: ${error.message}`);
  }
});

app.listen(8080, () => {
  console.log("Server listening on port 8080");
});
