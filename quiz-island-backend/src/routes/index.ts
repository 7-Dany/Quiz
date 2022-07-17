import {Router} from 'express';
import usersRoutes from './api/users.routes';
import postsRoutes from "./api/posts.routes";

const routes = Router();
routes.use('/api', usersRoutes);
routes.use('/api', postsRoutes)

routes.get('/api', (req, res) => {
    res.send('Hello from api');
});

export default routes;