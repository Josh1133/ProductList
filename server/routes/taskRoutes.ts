import express from 'express';
import { getTasks, createTask, updateTask, deleteTask } from '../controllers/taskController';
import { getTaskSuggestions } from '../services/aiService';

const router = express.Router();

router.get('/tasks', getTasks);
router.post('/tasks', createTask);
router.put('/tasks/:id', updateTask);
router.delete('/tasks/:id', deleteTask);

// Suggest tasks based on keyword
router.get('/suggestions/:keyword', async (req, res) => {
  try {
    const suggestions = await getTaskSuggestions(req.params.keyword);
    res.json(suggestions);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching suggestions' });
  }
});

export default router;
