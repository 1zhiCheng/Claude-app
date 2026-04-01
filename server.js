const express = require('express');
const cors = require('cors');
const db = require('./db');

const app = express();
app.use(cors());
app.use(express.json());

app.get('/tasks', (req, res) => {
  const tasks = db.prepare('SELECT * FROM tasks').all();
  res.json(tasks);
});

app.post('/tasks', (req, res) => {
  const { title, description } = req.body;
  const result = db.prepare('INSERT INTO tasks (title, description) VALUES (?, ?)').run(title, description);
  res.json({ id: result.lastInsertRowid, title, description, completed: 0 });
});

app.get('/tasks/:id', (req, res) => {
  const task = db.prepare('SELECT * FROM tasks WHERE id = ?').get(req.params.id);
  task ? res.json(task) : res.status(404).json({ error: 'Task not found' });
});

app.patch('/tasks/:id', (req, res) => {
  db.prepare('UPDATE tasks SET completed = 1 WHERE id = ?').run(req.params.id);
  res.json({ success: true });
});

app.delete('/tasks/:id', (req, res) => {
  db.prepare('DELETE FROM tasks WHERE id = ?').run(req.params.id);
  res.json({ success: true });
});

if (require.main === module) {
  const PORT = 3000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

module.exports = app;
