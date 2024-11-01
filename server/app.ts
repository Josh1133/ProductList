import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import taskRoutes from './routes/taskRoutes';

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use('/api', taskRoutes);
console.log(process.env.MONGO_URI)


mongoose.connect(process.env.MONGO_URI)
  .then(() => app.listen(5001, () => console.log('Server started on port 5001')))
  .catch(err => console.log(err));

  export default app;