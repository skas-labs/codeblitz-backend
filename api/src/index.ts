import express, { NextFunction, Request, Response } from 'express';
import { connect } from '@codeblitz/data';

import { route as playersRoute } from './routes/players'

const app = express();

app.use('/api/players', playersRoute)

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack)
  res.status(500).json({
    error: err.name,
    message: err.message
  })
})


async function runServer() {
  await connect()
  app.listen(3131, () => {
    console.log('API started on http://localhost:3131');
  });
}

runServer()