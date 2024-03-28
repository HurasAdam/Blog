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


const updateComment = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const { description } = req.body;
        const comment = await Comment.findById({ _id: id });

        if (!comment) {
            const error = new Error("Comment not found");
            next(error);
            return;
        }
        comment.description = description || comment?.description

        const updatedComment = await comment.save();
        return res.status(200).json(updatedComment);
    } catch (err) {
        next(err)
    }
}


const deleteComment = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;

        const comment = await Comment.findByIdAndDelete({ _id: id });


        if (!comment) {
            const error = new Error("Comment not found");
            next(error);
            return;
        }
        await Comment.deleteMany({ parent: comment._id })


        return res.status(200).json({ message: "Comment deleted successfully" });
    } catch (err) {
        next(err)
    }
}
export { createComment, updateComment, deleteComment }