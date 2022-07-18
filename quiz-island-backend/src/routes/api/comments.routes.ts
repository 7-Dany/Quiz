import {Router} from "express";
import validateToken from "../../middleware/token.middleware";
import {
    createComment,
    deleteComment,
    getAllComments,
    getComment,
    updateComment,
    updateCommentScore
} from "../../controllers/comments.controller";

const commentsRoutes = Router()

commentsRoutes.route('/comment').get(validateToken, getAllComments)
commentsRoutes.route('/comment/:id')
    .get(validateToken, getComment)
    .patch(validateToken, updateComment)
    .delete(validateToken, deleteComment)
commentsRoutes.route('/comment/score/:id').patch(validateToken, updateCommentScore)
commentsRoutes.route('/comment/:user_id').post(validateToken, createComment)

export default commentsRoutes