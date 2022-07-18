import {Router} from 'express';
import usersRoutes from './api/users.routes';
import postsRoutes from "./api/posts.routes";
import commentsRoutes from "./api/comments.routes";
import postCommentsRoutes from "./api/post_comments.routes";
import dashboardRoutes from "./api/dashboard.routes";

const routes = Router();
routes.use('/api', usersRoutes);
routes.use('/api', postsRoutes)
routes.use('/api', commentsRoutes)
routes.use('/api', postCommentsRoutes)
routes.use('/api', dashboardRoutes)

routes.get('/api', (req, res) => {
    res.send('Hello from api');
});

export default routes;