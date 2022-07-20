import {Router} from "express";
import {getPost, getAllPosts} from "../../controllers/dashboard.controller";
import validateToken from "../../middleware/token.middleware";

const dashboardRoutes = Router()

dashboardRoutes.route('/dashboard/post/:id').get(validateToken, getPost)
dashboardRoutes.route('/dashboard/post').get(validateToken, getAllPosts)

export default dashboardRoutes