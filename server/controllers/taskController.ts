import { Request, Response } from 'express';
import Task from '../models/Task';

// Get all tasks
export const getTasks = async (req: Request, res: Response) => {
  const tasks = await Task.find();
  res.json(tasks);
};

// Create a new task
export const createTask = async (req: Request, res: Response) => {
  const { title, description } = req.body;
  try {
    const newTask = await Task.create({
      title,
      description,
      completed: false,
    });
    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({ message: 'Error creating task', error });
  }
};

// Update a task
export const updateTask = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { completed, title, description, date } = req.body;
  try {
    const updatedTask = await Task.findByIdAndUpdate(
      id,
      { completed, title, description, createdAt: date },
      { new: true }
    );
    res.json(updatedTask);
  } catch (error) {
    res.status(500).json({ message: 'Error updating task', error });
  }
};

// Delete a task
export const deleteTask = async (req: Request, res: Response) => {
  const { id } = req.params;
  await Task.findByIdAndDelete(id);
  res.json({ message: 'Task deleted' });
};
