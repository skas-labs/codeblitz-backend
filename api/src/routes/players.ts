import { getPlayerById } from '../controllers/players';
import Router from 'express-promise-router';

export const route = Router();

route.get('/:id', async (req, res, next) => {
  const player = await getPlayerById((req.params as any).id);
  res.status(200).json(player)
});