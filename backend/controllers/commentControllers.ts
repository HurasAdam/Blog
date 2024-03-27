import { NextFunction, Request, Response } from "express";
import Post from "../models/Post";
import Comment from "../models/Comment";

const createComment = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { description, postId, parent, replyOnUser } = req.body;
        const post = await Post.findById({ _id: postId });
        console.log(post)
        if (!post) {
            const err = new Error("Post was not found")
            next(err);
            return;
        }
        const newComment = new Comment({
            user: req.user,
            description,
            post: post._id,
            parent,
            replyOnUser

        })
        const savedComment = await newComment.save();
        return res.status(201).json(savedComment);
    } catch (err) {
        next(err)
    }
}

export { createComment }