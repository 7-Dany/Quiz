import {Router} from "express";
import validateToken from "../../middleware/token.middleware";
import {
    createPostComment,
    deletePostComment,
    getAllPostComments,
    getPostComments
} from "../../controllers/post_comments.controller";

const postCommentsRoutes = Router()

postCommentsRoutes.route('/post-comment').get(validateToken, getAllPostComments)
postCommentsRoutes.route('/post-comment/:id')
    .post(validateToken, createPostComment)
    .get(validateToken, getPostComments)
    .delete(validateToken, deletePostComment)

export default postCommentsRoutes