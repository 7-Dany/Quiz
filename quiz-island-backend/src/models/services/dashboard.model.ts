import database from "../../database";

type DashboardPost = {
    id?: string,
    user_id: string,
    first_name: string,
    last_name: string,
    image: string,
    content: string,
    score: number,
    create_at: string,
}
type DashboardComment = {
    id?: string,
    post_id: string,
    user_id: string,
    first_name: string,
    last_name: string,
    image: string,
    email: string,
    content: string,
    score: number,
    created_at: string,
    reply_first_name?: string,
    reply_last_name?: string
}

export class DashboardPostModel {
    async showPost(id: string): Promise<DashboardPost> {
        try {
            const connect = await database.connect()
            const sql = `SELECT posts.id,
                                user_id,
                                first_name,
                                last_name,
                                image,
                                email,
                                content,
                                score,
                                create_at
                         FROM posts
                                  INNER JOIN users u on u.id = posts.user_id
                         WHERE posts.id = $1`
            const result = await connect.query(sql, [id])
            connect.release()
            return result.rows[0]
        } catch (error) {
            throw new Error(`Unable to get post information, ${(error as Error).message}`)
        }
    }

    async showPostComments(id: string): Promise<DashboardComment[]> {
        try {
            const connect = await database.connect()
            const sql = `SELECT post_id,
                                comment_id,
                                user_id,
                                u.first_name,
                                u.last_name,
                                u.image,
                                u.email,
                                content,
                                score,
                                created_at,
                                u2.first_name reply_first_name,
                                u2.last_name  reply_last_name
                         FROM post_comments
                                  INNER JOIN comments c on c.id = post_comments.comment_id
                                  INNER JOIN users u on u.id = c.user_id
                                  FULL JOIN users u2 on u2.id = post_comments.replying_to
                         WHERE post_id = $1`
            const result = await connect.query(sql, [id])
            connect.release()
            return result.rows
        } catch (error) {
            throw new Error(`Unable to get post information, ${(error as Error).message}`)
        }
    }
}