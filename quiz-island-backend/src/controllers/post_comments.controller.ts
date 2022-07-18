import {Request, Response, NextFunction} from "express";
import {PostCommentsModel} from "../models/post_coments.model";

const postCommentModel = new PostCommentsModel()

export const createPostComment = async (request: Request, response: Response, next: NextFunction) => {
    try {
        const postComment = {
            post_id: request.params.id,
            comment_id: request.body.comment_id,
            replying_to: request.body.replying_to
        }
        const newPostComment = await postCommentModel.create(postComment)
        response.json({
            status: "Success",
            data: {...newPostComment},
            message: "Post Comment got created successfully"
        })
    } catch (error) {
        next(error)
    }
}
export const getAllPostComments = async (request: Request, response: Response, next: NextFunction) => {
    try {
        const allPostComments = await postCommentModel.index()
        response.json({
            status: "Success",
            data: [...allPostComments],
            message: "All Post Comments got retrieved successfully"
        })
    } catch (error) {
        next(error)
    }
}
export const getPostComments = async (request: Request, response: Response, next: NextFunction) => {
    try {
        const id = request.params.id
        const postComments = await postCommentModel.show(id)
        response.json({
            status: "Success",
            data: [...postComments],
            message: "Post Comments Got retrieved successfully"
        })
    } catch (error) {
        next(error)
    }
}

export const deletePostComment = async (request: Request, response: Response, next: NextFunction) => {
    try {
        const id = request.params.id
        const postComment = await postCommentModel.delete(id)
        response.json({
            status: "Success",
            data: {...postComment},
            message: "Post Comment got deleted successfully"
        })
    } catch (error) {
        next(error)
    }
}