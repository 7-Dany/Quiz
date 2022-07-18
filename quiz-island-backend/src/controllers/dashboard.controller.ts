import {Response, Request, NextFunction} from "express";
import {DashboardPostModel} from "../models/services/dashboard.model";

const dashboardModel = new DashboardPostModel()

export const getPost = async (request: Request, response: Response, next: NextFunction) => {
    try {
        const id = request.params.id
        const post = await dashboardModel.showPost(id)
        const comments = await dashboardModel.showPostComments(id)
        response.json({
            status: "Success",
            data: {...post, comments: [...comments]},
            message: "Post got retrieved successfully"
        })
    } catch (error) {
        next(error)
    }
}