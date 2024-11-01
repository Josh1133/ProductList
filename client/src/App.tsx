// src/App.tsx
import React, { useState, useEffect } from 'react';
import { ITask } from './types';
import { fetchTasks, createTask, updateTask, deleteTask, getTaskSuggestions } from './services/taskService';

const App: React.FC = () => {
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskDescription, setNewTaskDescription] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const [editDescription, setEditDescription] = useState('');

  useEffect(() => {
    fetchTasks().then((response) => setTasks(response.data));
  }, []);

  const handleAddTask = () => {
    if (newTaskTitle) {
      createTask(newTaskTitle, newTaskDescription).then((response) => {
        setTasks([...tasks, response.data]);
        setNewTaskTitle('');
        setNewTaskDescription('');
        setSuggestions([]);
      });
    }
  };

  const handleInputChange = (keyword: string) => {
    setNewTaskTitle(keyword);
    if (keyword.length > 2) {
      getTaskSuggestions(keyword).then((response) => setSuggestions(response.data));
    } else {
      setSuggestions([]);
    }
  };

  const handleEditTask = (task: ITask) => {
    setEditingTaskId(task._id);
    setEditTitle(task.title);
    setEditDescription(task.description || '');
  };

  const handleSaveEditTask = (id: string, createdAt: Date) => {
    updateTask(id, undefined, editTitle, editDescription, createdAt).then((response) => {
      setTasks(tasks.map((task) => (task._id === id ? response.data : task)));
      setEditingTaskId(null);
      setEditTitle('');
      setEditDescription('');
    });
  };

  const handleDeleteTask = (id: string) => {
    deleteTask(id).then(() => {
      setTasks(tasks.filter((task) => task._id !== id));
    }).catch((error) => {
      console.error("Error deleting task:", error);
    });
  };

  const handleToggleCompleted = (id: string, completed: boolean, createdAt: Date) => {
    updateTask(id, completed, undefined, undefined, createdAt).then((response) => {
      setTasks(tasks.map((task) => (task._id === id ? response.data : task)));
    }).catch((error) => {
      console.error("Error updating task status:", error);
    });
  };
  

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">To-Do List</h1>

      {/* Task Input Section */}
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          value={newTaskTitle}
          onChange={(e) => handleInputChange(e.target.value)}
          placeholder="Add a new task title..."
        />
        <input
          type="text"
          className="form-control"
          value={newTaskDescription}
          onChange={(e) => setNewTaskDescription(e.target.value)}
          placeholder="Add a description..."
        />
        <button className="btn btn-primary" onClick={handleAddTask}>
          Add
        </button>
      </div>

      {/* Suggestions Section */}
      {suggestions.length > 0 && (
        <div className="mb-3">
          <h5>Suggestions</h5>
          <ul className="list-group">
            {suggestions.map((suggestion, index) => (
              <li key={index} className="list-group-item">
                {suggestion}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Task List Section */}
      <ul className="list-group">
        {tasks.map((task) => (
          <li key={task._id} className="list-group-item">
            {editingTaskId === task._id ? (
              // Edit form for the task
              <div>
                <input
                  type="text"
                  className="form-control mb-2"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  placeholder="Edit title..."
                />
                <input
                  type="text"
                  className="form-control mb-2"
                  value={editDescription}
                  onChange={(e) => setEditDescription(e.target.value)}
                  placeholder="Edit description..."
                />
                <button className="btn btn-success btn-sm me-2" onClick={() => handleSaveEditTask(task._id, new Date(task.createdAt))}>
                  Save
                </button>
                <button className="btn btn-secondary btn-sm" onClick={() => setEditingTaskId(null)}>
                  Cancel
                </button>
              </div>
            ) : (
              // Display task details with edit and delete buttons
              <div className="d-flex justify-content-between align-items-start">
                <div>
                  <input
                    type="checkbox"
                    className="form-check-input me-2"
                    checked={task.completed}
                    onChange={() => handleToggleCompleted(task._id, !task.completed, new Date(task.createdAt))}
                  />
                  <strong>{task.title}</strong>
                  <p>{task.description}</p>
                  <small className="text-muted">Created on: {new Date(task.createdAt).toLocaleString()}</small>
                </div>
                <div>
                  <button className="btn btn-warning btn-sm me-2" onClick={() => handleEditTask(task)}>
                    Edit
                  </button>
                  <button className="btn btn-danger btn-sm" onClick={() => handleDeleteTask(task._id)}>
                    Delete
                  </button>
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
