import express from 'express';
import { errorHandler } from './middleware/handleError';
import { connectDB } from './config/db';


connectDB();
const app = express();

app.use(express.json());

app.use(errorHandler);

export default app;