import {Request, Response, NextFunction} from 'express';
import {UsersModel, User} from '../models/users.model';
import config from '../config';
import jwt from 'jsonwebtoken';
import {statusError} from "../middleware/error.middleware";


const usersModel = new UsersModel();

export const createUser = async (request: Request, response: Response, next: NextFunction) => {
    try {
        const user: User = {
            first_name: request.body.first_name,
            last_name: request.body.last_name,
            image: request.body.image,
            email: request.body.email,
            password: request.body.password
        };
        const create = await usersModel.create(user);
        const token = jwt.sign({user}, config.token as unknown as string);
        response.json({
            status: 'Success',
            data: {...create, token},
            message: 'User got created successfully'
        });
    } catch (error) {
        next(error);
    }
};
export const updateUser = async (request: Request, response: Response, next: NextFunction) => {
    try {
        const user = {
            first_name: request.body.first_name,
            last_name: request.body.last_name,
            email: request.body.email,
            image: request.body.image
        }
        const update = await usersModel.update(request.params.id, user as User)
        response.json({
            status: "Success",
            data: {...update},
            message: "User got updated successfully"
        })
    } catch (error) {
        next(error)
    }
}
export const showUser = async (request: Request, response: Response, next: NextFunction) => {
    try {
        const id = request.params.id
        const authorizationHeader = request.headers.authorization as string;
        const token = authorizationHeader?.split(' ')[1];
        const decode = jwt.decode(token);
        const user = await usersModel.show(id);
        // @ts-ignore
        if (decode && decode['user'].email === user.email) {
            response.json({
                status: 'Success',
                data: {...user},
                message: 'User got retrieved successfully'
            });
        } else {
            const error: statusError = new Error('Unauthorized Person')
            error.status = 401
            next(error)
        }
    } catch (error) {
        next(error);
    }
};

export const getAllUsers = async (request: Request, response: Response, next: NextFunction) => {
    try {
        const users = await usersModel.index();
        response.json({
            status: 'Success',
            data: [...users],
            message: 'Users got retrieved successfully'
        });
    } catch (error) {
        next(error);
    }
};
export const deleteUser = async (request: Request, response: Response, next: NextFunction) => {
    try {
        const authorizationHeader = request.headers.authorization as string;
        const token = authorizationHeader?.split(' ')[1];
        const decode = jwt.decode(token);
        if (decode) {
            // @ts-ignore
            const deleteUser = await usersModel.delete(decode['user'].email)
            return response.json({
                status: 'Success',
                data: {...deleteUser},
                message: "User got deleted successfully"
            })
        } else {
            const error: statusError = new Error('Provide Right Email With Right Password')
            error.status = 401
            next(error)
        }
    } catch (error) {
        next(error)
    }
}
export const authenticateUser = async (request: Request, response: Response, next: NextFunction) => {
    try {
        const userToAuthenticate = {
            email: request.body.email,
            password: request.body.password
        };
        const authenticatedUser = await usersModel.authenticate(userToAuthenticate as User);
        const token = jwt.sign({user: authenticatedUser}, config.token as unknown as string);
        if (!authenticatedUser) {
            return response.status(401).json({
                status: 'unauthorized user',
                message: 'password is wrong please try again'
            });
        }
        return response.json({
            status: 'success',
            data: {
                id: authenticatedUser.email,
                first_name: authenticatedUser.first_name,
                last_name: authenticatedUser.last_name,
                email: authenticatedUser.email,
                image: authenticatedUser.image,
                token
            },
            message: 'user authenticated successfully'
        });
    } catch (error) {
        next(error);
    }
};