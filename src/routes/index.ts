import { Router } from 'express';
import signer from './signer';

const routes = Router();

routes.get('/', async (_req, res) => {
  return res.json({ message: 'hello world!' });
});

routes.use(signer);

export default routes;
