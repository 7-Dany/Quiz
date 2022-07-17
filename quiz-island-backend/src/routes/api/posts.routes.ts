import {Router} from "express";
import {createPost} from "../../controllers/posts.controller";
import validateToken from "../../middleware/token.middleware";

const postsRoutes = Router()

postsRoutes.route('/post/:user_id').post(validateToken,createPost)

export default postsRoutes