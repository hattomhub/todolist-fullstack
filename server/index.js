const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

// MIDDLEWARE
app.use(cors());
app.use(express.json()); //request.body

// ROUTES
// POST REQUEST - TO CREATE A TODO
app.post("/todos", async (request, response) => {
    try {
        const { description } = request.body;
        const newTodo = await pool.query("INSERT INTO todo (todo_description) VALUES($1) RETURNING *", [description]);

        response.json(newTodo.rows[0]);

    } catch (error) {
        console.log(error.message);
    }
});

// GET REQUEST - TO GET ALL TODOS 
app.get("/todos", async (request, response) => {
    try {
        const allTodos = await pool.query("SELECT * FROM todo");
        response.json(allTodos.rows);
    } catch (error) {
        console.log(error.message);
    }
});

// GET REQUEST - TO GET A SPECIFIC TODO
app.get("/todos/:id", async (request, response) => {
    try {
        const { id } = request.params;
        const todo = await pool.query("SELECT * FROM todo WHERE todo_id = $1", [id]);

        response.json(todo.rows[0]);
    } catch (error) {
        console.log(error.message);
    }
});

// PUT REQUEST - TO UPDATE A SPECIFIC TODO
app.put("/todos/:id", async (request, response) => {
    try {
        const { id } = request.params;
        const { description } = request.body;
        const updateTodo = await pool.query("UPDATE todo SET todo_description = $1 WHERE todo_id = $2", [description, id]);

        response.json("Todo was updated!");
    } catch (error) {
        console.log(error.message);
    }
});

// DELETE REQUEST - TO DELETE A SPECIFIC TODO
app.delete("/todos/:id", async (request, response) => {
    try {
        const { id } = request.params;
        const deleteTodo = await pool.query("DELETE FROM todo WHERE todo_id = $1", [id]);

        response.json("Todo was deleted!");
    } catch (error) {
        console.log(error.message);
    }
});


// SERVER START
app.listen(5000, () => {
    console.log("Server has started on port, 5000");
});