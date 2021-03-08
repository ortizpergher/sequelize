import { Router } from 'express';
import PostController from '../controllers/PostController';

const routes = new Router();

routes.get('/posts', PostController.index);
routes.post('/posts', PostController.store);
routes.put('/posts/:uid', PostController.update);
routes.get('/posts/:uid', PostController.show);
routes.delete('/posts/:uid', PostController.delete);

export default routes;
