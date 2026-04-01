const request = require('supertest');
const app = require('./server');
const db = require('./db');

beforeEach(() => {
  db.exec('DELETE FROM tasks');
});

describe('Task API', () => {
  test('GET /tasks returns empty array', async () => {
    const res = await request(app).get('/tasks');
    expect(res.status).toBe(200);
    expect(res.body).toEqual([]);
  });

  test('POST /tasks creates a task', async () => {
    const res = await request(app)
      .post('/tasks')
      .send({ title: 'Test Task', description: 'Test Description' });
    expect(res.status).toBe(200);
    expect(res.body).toMatchObject({ title: 'Test Task', description: 'Test Description', completed: 0 });
    expect(res.body.id).toBeDefined();
  });

  test('GET /tasks/:id returns a task', async () => {
    const created = await request(app).post('/tasks').send({ title: 'Task 1' });
    const res = await request(app).get(`/tasks/${created.body.id}`);
    expect(res.status).toBe(200);
    expect(res.body.title).toBe('Task 1');
  });

  test('GET /tasks/:id returns 404 for non-existent task', async () => {
    const res = await request(app).get('/tasks/999');
    expect(res.status).toBe(404);
  });

  test('PATCH /tasks/:id marks task as completed', async () => {
    const created = await request(app).post('/tasks').send({ title: 'Task 1' });
    await request(app).patch(`/tasks/${created.body.id}`);
    const res = await request(app).get(`/tasks/${created.body.id}`);
    expect(res.body.completed).toBe(1);
  });

  test('DELETE /tasks/:id deletes a task', async () => {
    const created = await request(app).post('/tasks').send({ title: 'Task 1' });
    await request(app).delete(`/tasks/${created.body.id}`);
    const res = await request(app).get(`/tasks/${created.body.id}`);
    expect(res.status).toBe(404);
  });
});
