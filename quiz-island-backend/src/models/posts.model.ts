import database from "../database";


export type Post = {
    id?: string,
    content: string,
    user_id: string,
    create_at: string,
    score: number
}

export class PostsModel {
    async index(): Promise<Post[]> {
        try {
            const connect = await database.connect()
            const sql = `SELECT *
                         FROM posts
                         ORDER BY create_at DESC`
            const result = await connect.query(sql)
            connect.release()
            return result.rows
        } catch (error) {
            throw new Error(`Unable to get all posts, ${(error as Error).message}`)
        }
    }

    async show(id: string): Promise<Post> {
        try {
            const connect = await database.connect()
            const sql = `SELECT *
                         FROM posts
                         WHERE id = $1`
            const result = await connect.query(sql, [id])
            connect.release()
            return result.rows[0]
        } catch (error) {
            throw new Error(`Unable to get post, ${(error as Error).message}`)
        }
    }

    async create(post: Post): Promise<Post> {
        try {
            const connect = await database.connect()
            const sql = `INSERT INTO posts (content, user_id, create_at, score)
                         VALUES ($1, $2, $3, $4)
                         RETURNING *`
            const result = await connect.query(sql, [post.content, post.user_id, post.create_at, post.score])
            connect.release()
            return result.rows[0]
        } catch (error) {
            throw new Error(`Unable to create Post, ${(error as Error).message}`)
        }
    }

    async update(id: string, newContent: string): Promise<Post> {
        try {
            const connect = await database.connect()
            const sql = `UPDATE posts
                         SET content=$1
                         WHERE id = $2
                         RETURNING *`
            const result = await connect.query(sql, [newContent, id])
            return result.rows[0]
        } catch (error) {
            throw new Error(`Unable to update Post, ${(error as Error).message}`)
        }
    }

    async updateScore(id: string, score: number): Promise<Post> {
        try {
            const connect = await database.connect()
            const sql = `UPDATE posts
                         SET score=$1
                         WHERE id = $2
                         RETURNING *`
            const result = await connect.query(sql, [score, id])
            return result.rows[0]
        } catch (error) {
            throw new Error(`Unable to update Post, ${(error as Error).message}`)
        }
    }

    async delete(id: string): Promise<Post> {
        try {
            const connect = await database.connect()
            const sql = `DELETE
                         FROM posts
                         WHERE id = $1
                         RETURNING *`
            const result = await connect.query(sql, [id])
            return result.rows[0]
        } catch (error) {
            throw new Error(`Unable to delete Post, ${(error as Error).message}`)
        }
    }
}