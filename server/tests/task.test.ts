import request, { Response } from 'supertest';
import app from '../app';
import Task, { ITask } from '../models/Task';

// Clear the database between tests
afterEach(async () => {
  await Task.deleteMany({});
});

describe('Task API', () => {
  // Test for creating a new task
  it('should create a new task', async () => {
    console.log(process.env.MONGO_URI)
    const newTask: Partial<ITask> = {
      title: 'Test Task',
      description: 'Test task description',
      completed: false,
    };

    const response: Response = await request(app)
      .post('/api/tasks')
      .send(newTask)
      .expect(201);

    // Assertions
    expect(response.body).toHaveProperty('_id');
    expect(response.body.title).toBe(newTask.title);
    expect(response.body.description).toBe(newTask.description);
    expect(response.body.completed).toBe(newTask.completed);
    expect(response.body).toHaveProperty('createdAt');
  });

  // Test for retrieving the task list
  it('should retrieve the task list', async () => {
    // Seed the database with a test task
    const task: ITask = await Task.create({
      title: 'Sample Task',
      description: 'Sample task description',
      completed: false,
    });

    const response: Response = await request(app)
      .get('/api/tasks')
      .expect(200);

    // Assertions
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBe(1); // There should be one task
    expect(response.body[0]._id).toBe(task._id.toString());
    expect(response.body[0].title).toBe(task.title);
    expect(response.body[0].description).toBe(task.description);
  });
});
