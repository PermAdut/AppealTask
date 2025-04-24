import express from 'express';
import { errorHandler } from './middleware/handleError';
import { connectDB } from './config/db';
import { parseReqBody } from './middleware/parseReqBody';
import appealRoute from './routes/appeal.route';

connectDB();
const app = express();

app.use(express.json());
app.use(parseReqBody);
app.use(errorHandler);
app.use('/api/v1.0/appeal', appealRoute);
export default app;