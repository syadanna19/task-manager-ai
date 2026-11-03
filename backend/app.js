const express = require('express');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

let tasks = [
  { id: 1, title: 'Set up project', completed: true },
  { id: 2, title: 'Build task API', completed: false }
];

app.get('/tasks', (req, res) => {
  res.json(tasks);
});

app.post('/tasks', (req, res) => {
  const { title, completed = false } = req.body;

  if (!title || typeof title !== 'string' || !title.trim()) {
    return res.status(400).json({ error: 'Task title is required.' });
  }

  const newTask = {
    id: Date.now(),
    title: title.trim(),
    completed
  };

  tasks.push(newTask);

  res.status(201).json(newTask);
});

app.listen(port, () => {
  console.log(`Task API running on http://localhost:${port}`);
});
