import {Router} from "express";
import {
    createPost,
    deletePost,
    getAllPosts,
    getPost,
    updatePost,
    updatePostScore
} from "../../controllers/posts.controller";
import validateToken from "../../middleware/token.middleware";

const postsRoutes = Router()

postsRoutes.route('/post').get(validateToken, getAllPosts)
postsRoutes.route('/post/:id')
    .get(validateToken, getPost)
    .delete(validateToken, deletePost)
    .patch(validateToken, updatePost)
postsRoutes.route('/post/:user_id').post(validateToken, createPost)
postsRoutes.route('/post/score/:id').patch(validateToken, updatePostScore)


export default postsRoutes