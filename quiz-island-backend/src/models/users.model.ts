import database from '../database';
import config from '../config';
import bcrypt from 'bcrypt';

export type User = {
    id?: string,
    first_name: string,
    last_name: string,
    image: string,
    email: string,
    password: string
}

export class UsersModel {
    async index(): Promise<User[]> {
        try {
            const connect = await database.connect();
            const sql = `SELECT id, first_name, last_name, email, image
                         FROM users`;
            const result = await connect.query(sql);
            connect.release();
            return result.rows;
        } catch (error) {
            throw new Error(`Unable to get all users, ${(error as Error).message}`);
        }
    }

    async show(id: string): Promise<User> {
        try {
            const connect = await database.connect();
            const sql = `SELECT id, first_name, last_name, email, image
                         FROM users
                         WHERE id = $1`;
            const result = await database.query(sql, [id]);
            connect.release();
            return result.rows[0];
        } catch (error) {
            throw new Error(`Unable to get user, ${(error as Error).message}`);
        }
    }

    async create(user: User): Promise<User> {
        try {
            const connect = await database.connect();
            const checkEmail = await connect.query(`SELECT *
                                                    FROM users
                                                    WHERE email = $1`, [user.email])
            if (checkEmail.rows[0]) {
                connect.release();
                throw new Error('This Email Already Used Try To Login Instead')
            } else {
                const sql = `INSERT INTO users (first_name, last_name, image, email, password)
                             VALUES ($1, $2, $3, $4, $5)
                             RETURNING id, first_name, last_name, email,image`;
                const hashedPassword = bcrypt.hashSync(user.password + config.pepper, config.salt);
                const result = await connect
                    .query(sql, [
                        user.first_name,
                        user.last_name,
                        user.image,
                        user.email,
                        hashedPassword]);
                connect.release();
                return result.rows[0];
            }
        } catch (error) {
            throw new Error(`${(error as Error).message}`);
        }
    }

    async update(id: string, user: User): Promise<User> {
        try {
            const connect = await database.connect()
            const getUser = await connect.query(`SELECT *
                                                 FROM users
                                                 where id = $1`, [id])
            const newUser = {
                first_name: user.first_name ? user.first_name : getUser.rows[0].first_name,
                last_name: user.last_name ? user.last_name : getUser.rows[0].last_name,
                email: user.email ? user.email : getUser.rows[0].email,
                image: user.image ? user.image : getUser.rows[0].image,
            }
            const sql = `UPDATE users
                         SET first_name=$1,
                             last_name = $2,
                             email=$3,
                             image=$4
                         WHERE id = $5
                         RETURNING *`
            const result = await connect
                .query(sql, [
                    newUser.first_name,
                    newUser.last_name,
                    newUser.email,
                    newUser.image,
                    id])
            connect.release()
            return result.rows[0]
        } catch (error) {
            throw new Error(`Unable to update user, ${(error as Error).message}`);
        }
    }

    async delete(email: string): Promise<User> {
        try {
            const connect = await database.connect()
            const sql = `DELETE
                         FROM users
                         WHERE email = $1
                         RETURNING *`
            const result = await connect.query(sql, [email])
            connect.release()
            return result.rows[0]
        } catch (error) {
            throw new Error(`Unable to delete user, ${(error as Error).message}`)
        }
    }

    async authenticate(user: User): Promise<User | null> {
        try {
            const connect = await database.connect();
            const sql = `SELECT *
                         FROM users
                         WHERE email = $1`;
            const result = await connect.query(sql, [user.email]);
            if (result.rows.length) {
                const {password: userPassword} = result.rows[0];
                const isPasswordValid = bcrypt.compareSync(user.password + config.pepper, userPassword);
                if (isPasswordValid) {
                    return result.rows[0];
                }
            } else {
                throw new Error('Email Is not exist try to sign up instead')
            }
            connect.release();
            return null;
        } catch (error) {
            throw new Error(`Unable to login, ${(error as Error).message}`);
        }
    }
}