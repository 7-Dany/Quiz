import {Request, Response, NextFunction} from "express";
import {Comment, CommentsModel} from "../models/comments.model";

const commentsModel = new CommentsModel()

export const getAllComments = async (request: Request, response: Response, next: NextFunction) => {
    try {
        const allComments = await commentsModel.index()
        response.json({
            status: "Success",
            data: [...allComments],
            message: 'Comments Got retrieved successfully'
        })
    } catch (error) {
        next(error)
    }
}
export const getComment = async (request: Request, response: Response, next: NextFunction) => {
    try {
        const id = request.params.id
        const comment = await commentsModel.show(id)
        response.json({
            status: "Success",
            data: {...comment},
            message: "comment got retrieved successfully"
        })
    } catch (error) {
        next(error)
    }
}
export const createComment = async (request: Request, response: Response, next: NextFunction) => {
    try {
        const date = new Date()
        const comment = {
            content: request.body.content,
            user_id: request.params.user_id,
            create_at: `${date.getUTCFullYear()}-${date.getMonth()}-${date.getDay()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`,
            score: 0
        }
        const newComment = await commentsModel.create(comment)
        response.json({
            status: "Success",
            data: {...newComment},
            message: "Comment got created successfully"
        })
    } catch (error) {
        next(error)
    }
}
export const updateComment = async (request: Request, response: Response, next: NextFunction) => {
    try {
        const id = request.params.id
        const content = request.body.content
        const comment = await commentsModel.update(id, content)
        response.json({
            status: "Success",
            data: {...comment},
            message: "Comment got updated successfully"
        })
    } catch (error) {
        next(error)
    }
}

export const updateCommentScore = async (request: Request, response: Response, next: NextFunction) => {
    try {
        const state = request.body.state as unknown as Boolean
        const id = request.params.id
        const comment = await commentsModel.updateScore(id, state)
        response.json({
            status: "Success",
            data: {...comment},
            message: "Comment score got updated successfully"
        })
    } catch (error) {
        next(error)
    }
}

export const deleteComment = async (request: Request, response: Response, next: NextFunction) => {
    try {
        const id = request.params.id
        const comment = await commentsModel.delete(id)
        response.json({
            status: "Success",
            data: {...comment},
            message: 'Comment got deleted successfully'
        })
    } catch (error) {
        next(error)
    }
}