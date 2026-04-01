import { useState, useEffect } from 'react';

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    fetch('http://localhost:3000/tasks')
      .then(res => res.json())
      .then(setTasks);
  }, []);

  const addTask = (e) => {
    e.preventDefault();
    fetch('http://localhost:3000/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, description })
    })
      .then(res => res.json())
      .then(task => {
        setTasks([...tasks, task]);
        setTitle('');
        setDescription('');
      });
  };

  const toggleComplete = (id) => {
    fetch(`http://localhost:3000/tasks/${id}`, { method: 'PATCH' })
      .then(() => setTasks(tasks.map(t => t.id === id ? { ...t, completed: 1 } : t)));
  };

  const deleteTask = (id) => {
    fetch(`http://localhost:3000/tasks/${id}`, { method: 'DELETE' })
      .then(() => setTasks(tasks.filter(t => t.id !== id)));
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <h1>Task Manager</h1>
      <form onSubmit={addTask}>
        <input
          value={title}
          onChange={e => setTitle(e.target.value)}
          placeholder="Title"
          required
          style={{ width: '100%', padding: '8px', marginBottom: '8px' }}
        />
        <input
          value={description}
          onChange={e => setDescription(e.target.value)}
          placeholder="Description"
          style={{ width: '100%', padding: '8px', marginBottom: '8px' }}
        />
        <button type="submit" style={{ padding: '8px 16px' }}>Add Task</button>
      </form>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {tasks.map(task => (
          <li key={task.id} style={{ padding: '10px', border: '1px solid #ddd', marginTop: '8px' }}>
            <input
              type="checkbox"
              checked={task.completed === 1}
              onChange={() => toggleComplete(task.id)}
            />
            <span style={{ marginLeft: '8px', textDecoration: task.completed ? 'line-through' : 'none' }}>
              {task.title} {task.description && `- ${task.description}`}
            </span>
            <button onClick={() => deleteTask(task.id)} style={{ float: 'right' }}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
