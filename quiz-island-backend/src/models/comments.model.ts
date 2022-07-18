import database from "../database";

export type Comment = {
    id?: string,
    content: string,
    score: number,
    create_at: string,
    user_id: string
}

export class CommentsModel {
    async index(): Promise<Comment[]> {
        try {
            const connect = await database.connect()
            const sql = `SELECT *
                         FROM comments`
            const result = await connect.query(sql)
            connect.release()
            return result.rows
        } catch (error) {
            throw new Error(`Unable to get all comments, ${(error as Error).message}`)
        }
    }

    async show(id: string): Promise<Comment> {
        try {
            const connect = await database.connect()
            const sql = `SELECT *
                         FROM comments
                         WHERE id = $1`
            const result = await connect.query(sql, [id])
            connect.release()
            return result.rows[0]
        } catch (error) {
            throw new Error(`Unable to get comment, ${(error as Error).message}`)
        }
    }

    async create(comment: Comment): Promise<Comment> {
        try {
            const connect = await database.connect()
            const sql = `INSERT INTO comments (content, score, created_at, user_id)
                         VALUES ($1, $2, $3, $4)
                         RETURNING *`
            const result = await connect.query(sql, [comment.content, comment.score, comment.create_at, comment.user_id])
            connect.release()
            return result.rows[0]
        } catch (error) {
            throw new Error(`Unable to create update, ${(error as Error).message}`)
        }
    }

    async update(id: string, content: string): Promise<Comment> {
        try {
            const connect = await database.connect()
            const sql = `UPDATE comments
                         SET content=$1
                         WHERE id = $2
                         RETURNING *`
            const result = await connect.query(sql, [content, id])
            connect.release()
            return result.rows[0]
        } catch (error) {
            throw new Error(`Unable to update comment, ${(error as Error).message}`)
        }
    }

    async updateScore(id: string, state: Boolean): Promise<Comment> {
        try {
            const connect = await database.connect()
            const commentScore = await connect.query(`SELECT score
                                                      FROM comments
                                                      WHERE id = $1`, [id])
            const score = commentScore.rows[0].score
            const sql = `UPDATE comments
                         SET score=$1
                         WHERE id = $2
                         RETURNING *`
            const result = await connect.query(sql, [state ? score + 1 : score - 1, id])
            connect.release()
            return result.rows[0]
        } catch (error) {
            throw new Error(`Unable to update score for comment, ${(error as Error).message}`)
        }
    }

    async delete(id: string): Promise<Comment> {
        try {
            const connect = await database.connect()
            const sql = `DELETE
                         FROM comments
                         WHERE id = $1
                         RETURNING *`
            const result = await connect.query(sql, [id])
            connect.release()
            return result.rows[0]
        } catch (error) {
            throw new Error(`Unable to delete comment, ${(error as Error).message}`)
        }
    }
}