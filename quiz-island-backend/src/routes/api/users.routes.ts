import {Router} from 'express';
import {
    authenticateUser,
    createUser,
    deleteUser,
    getAllUsers,
    showUser,
    updateUser
} from '../../controllers/users.controller';
import validateToken from '../../middleware/token.middleware';

const usersRoutes = Router();

usersRoutes.route('/user').post(createUser).get(validateToken, getAllUsers).delete(validateToken, deleteUser);
usersRoutes.route('/user/:id').get(validateToken, showUser).patch(validateToken, updateUser);
usersRoutes.route('/user/authenticate').post(authenticateUser);

export default usersRoutes;