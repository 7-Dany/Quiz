import {Router} from "express";
import {getPost} from "../../controllers/dashboard.controller";
import validateToken from "../../middleware/token.middleware";

const dashboardRoutes = Router()

dashboardRoutes.route('/dashboard/:id').get(validateToken, getPost)

export default dashboardRoutes