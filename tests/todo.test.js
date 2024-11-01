// tests/todo.test.js
const request = require('supertest');
const app = require('../app');

describe('Todo API', () => {
  it('should return an empty array initially', async () => {
    const res = await request(app).get('/todos');
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual([]);
  });

  it('should add a new todo', async () => {
    const newTodo = { title: 'Test Todo' };
    const res = await request(app).post('/todos').send(newTodo);
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body.title).toBe(newTodo.title);
  });

  it('should delete a todo', async () => {
    // Add a todo to delete
    const newTodo = { title: 'Delete Me' };
    const addRes = await request(app).post('/todos').send(newTodo);
    const todoId = addRes.body.id;

    // Delete the todo
    const res = await request(app).delete(`/todos/${todoId}`);
    expect(res.statusCode).toBe(204);

    // Verify deletion
    const getRes = await request(app).get('/todos');
    expect(getRes.body).not.toContainEqual(expect.objectContaining({ id: todoId }));
  });
});
