import {Request, Response, NextFunction} from "express";
import {Post, PostsModel} from '../models/posts.model'
import config from "../config";

const postsModel = new PostsModel()

export const createPost = async (request: Request, response: Response, next: NextFunction) => {
    try {
        const date = new Date()
        const post = {
            content: request.body.content,
            user_id: request.params.user_id,
            create_at: `${date.getUTCFullYear()}-${date.getMonth()}-${date.getDay()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`,
            score: 0
        }
        const create = await postsModel.create(post)
        response.json({
            status: 'Success',
            data: {...create},
            message: 'Post got created successfully'
        })
    } catch (error) {
        next(error)
    }
}

export const getAllPosts = async (request: Request, response: Response, next: NextFunction) => {
    try {
        const posts = await postsModel.index()
        response.json({
            status: "Success",
            data: [...posts],
            message: "All Data got retrieved successfully"
        })
    } catch (error) {
        next(error)
    }
}
export const getPost = async (request: Request, response: Response, next: NextFunction) => {
    try {
        const post = await postsModel.show(request.params.id)
        response.json({
            status: "Success",
            data: {...post},
            message: "Post got retrieved successfully"
        })
    } catch (error) {
        next(error)
    }
}
export const updatePost = async (request: Request, response: Response, next: NextFunction) => {
    try {
        const id = request.params.id
        const content = request.body.content
        const post = await postsModel.update(id, content)
        response.json({
            status: "Success",
            data: {...post},
            message: "Post Got Updated successfully"
        })
    } catch (error) {
        next(error)
    }
}

export const updatePostScore = async (request: Request, response: Response, next: NextFunction) => {
    try {
        const id = request.params.id
        const score = request.body.score
        const post = await postsModel.updateScore(id, score)
        response.json({
            status: "Success",
            data: {...post},
            message: "Post Score Got Updated successfully"
        })
    } catch (error) {
        next(error)
    }
}

export const deletePost = async (request: Request, response: Response, next: NextFunction) => {
    try {

    } catch (error) {
        next(error)
    }
}