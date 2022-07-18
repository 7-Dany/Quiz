import database from "../database";

export type PostComment = {
    id?: string,
    comment_id: string,
    post_id: string,
    replying_to?: string
}

export class PostCommentsModel {
    async index(): Promise<PostComment[]> {
        try {
            const connect = await database.connect()
            const sql = `SELECT *
                         FROM post_comments`
            const result = await connect.query(sql)
            connect.release()
            return result.rows
        } catch (error) {
            throw new Error(`Unable to get post comments, ${(error as Error).message}`)
        }
    }

    async show(id: string): Promise<PostComment[]> {
        try {
            const connect = await database.connect()
            const sql = `SELECT *
                         FROM post_comments
                         WHERE post_id = $1`
            const result = await connect.query(sql, [id])
            connect.release()
            return result.rows
        } catch (error) {
            throw new Error(`Unable to get post comment, ${(error as Error).message}`)
        }
    }

    async create(postComment: PostComment): Promise<PostComment> {
        try {
            const connect = await database.connect()
            const sql = `INSERT INTo post_comments (post_id, comment_id, replying_to)
                         VALUES ($1, $2, $3)
                         RETURNING *`
            const result = await connect.query(sql, [postComment.post_id, postComment.comment_id, postComment.replying_to])
            connect.release()
            return result.rows[0]
        } catch (error) {
            throw new Error(`Unable to create post comment, ${(error as Error).message}`)
        }
    }

    async delete(id: string): Promise<PostComment> {
        try {
            const connect = await database.connect()
            const sql = `DELETE
                         FROM post_comments
                         WHERE id = $1
                         RETURNING *`
            const result = await connect.query(sql, [id])
            connect.release()
            return result.rows[0]
        } catch (error) {
            throw new Error(`Unable to delete post comment, ${(error as Error).message}`)
        }
    }
}
