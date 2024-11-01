// src/services/taskService.ts
import axios from 'axios';
import { ITask } from '../types';

const API_URL = 'http://localhost:5001/api';

export const fetchTasks = () => axios.get<ITask[]>(`${API_URL}/tasks`);
export const createTask = (title: string, description: string) => 
  axios.post<ITask>(`${API_URL}/tasks`, { title, description });
export const updateTask = (id: string, completed?: boolean, title?: string, description?: string, date?: Date) => 
  axios.put<ITask>(`${API_URL}/tasks/${id}`, { completed, title, description, date });
export const deleteTask = (id: string) => axios.delete(`${API_URL}/tasks/${id}`);
export const getTaskSuggestions = (keyword: string) => axios.get<string[]>(`${API_URL}/suggestions/${keyword}`);
