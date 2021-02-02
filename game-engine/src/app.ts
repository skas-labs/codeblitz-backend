import path from 'path';
import express from 'express';

const app = express();

app.use(express.static(path.join(__dirname, '../public')))

export default app;
