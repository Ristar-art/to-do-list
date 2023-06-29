// const express = require('express');
// const app = express();
// const PORT = 3001;

// app.use(express.json());

// let todos = [];

// app.get('/todos', (req, res) => {
//   res.json(todos);
// });

// app.post('/todos', (req, res) => {
//   const newTodo = req.body;
//   todos.push(newTodo);
//   res.sendStatus(201);
// });

// app.put('/todos/:id', (req, res) => {
//   const id = req.params.id;
//   const updatedTodo = req.body;
//   todos = todos.map((todo) => (todo.id === id ? updatedTodo : todo));
//   res.sendStatus(204);
// });

// app.listen(PORT, () => {
//   console.log(`Server is running on http://localhost:${PORT}`);
// });
