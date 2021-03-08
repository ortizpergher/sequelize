import { Router } from 'express';
import UserController from '../controllers/UserController';

const routes = new Router();

routes.get('/users', UserController.index);
routes.post('/users', UserController.store);
routes.put('/users/:uid', UserController.update);
routes.get('/users/:uid', UserController.show);
routes.delete('/users/:uid', UserController.delete);

export default routes;
