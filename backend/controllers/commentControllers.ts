import { NextFunction, Request, Response } from "express";
import Post from "../models/Post";
import Comment from "../models/Comment";
import * as types from "../shared/types";
import User from "../models/User";
import { error } from "console";

const createComment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { description, postId, parent, replyOnUser } = req.body;
    const post = await Post.findById({ _id: postId });
    console.log(post);
    if (!post) {
      const err = new Error("Post was not found");
      next(err);
      return;
    }
    const newComment = new Comment({
      user: req.user,
      description,
      post: post._id,
      parent,
      replyOnUser,
    });
    const savedComment = await newComment.save();
    return res.status(201).json(savedComment);
  } catch (err) {
    next(err);
  }
};

const updateComment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const { description } = req.body;
    const comment = await Comment.findById({ _id: id });

    if (!comment) {
      const error = new Error("Comment not found");
      next(error);
      return;
    }
    comment.description = description || comment?.description;

    const updatedComment = await comment.save();
    return res.status(200).json(updatedComment);
  } catch (err) {
    next(err);
  }
};

const deleteComment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    const comment = await Comment.findByIdAndDelete({ _id: id });

    if (!comment) {
      const error = new Error("Comment not found");
      next(error);
      return;
    }
    await Comment.deleteMany({ parent: comment._id });

    return res.status(200).json({ message: "Comment deleted successfully" });
  } catch (err) {
    next(err);
  }
};

const getAllComments = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const filter = req.query.searchKeyword;
    const author = req.query.author;
    const checkedParam = req.query.checked;

    console.log(filter);
    console.log(author);

    let where: types.ICommentWhere = {};

    if (filter && typeof filter === "string") {
      where.title = { $regex: filter, $options: "i" };
    }

    if (author && typeof author === "string") {
      const selectedUserId = await User.find({ name: author })
        .select("_id")
        .lean();
      where.user = { $in: selectedUserId };
    }

    if (checkedParam !== "") {
      const checked = checkedParam === "true";
      where.check = checked;
    }

    console.log(where);

    let query = Comment.find(where);
    const page = parseInt(req?.query?.page as string) || 1;
    const pageSize = parseInt(req?.query?.limit as string) || 10;
    const skip = (page - 1) * pageSize;
    const total = await Comment.find(where).countDocuments();
    const pages = Math.ceil(total / pageSize);

    res.header({
      "x-filter": filter,
      "x-totalcount": JSON.stringify(total),
      "x-currentpage": JSON.stringify(page),
      "x-pageSize": JSON.stringify(pageSize),
      "x-totalpagecount": JSON.stringify(pages),
    });

    if (page > pages) {
      return res.json([]);
    }
    const result = await query
      .skip(skip)
      .limit(pageSize)
      .populate([
        {
          path: "user",
          select: ["name", "avatar", "verified"],
        },
        {
          path: "post",
          select: ["title", "photo"],
        },
      ])
      .sort({ updatedAt: "descending" });

    return res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

const approveComment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    const comment = await Comment.findById({ _id: id });
    if (!comment) {
      const error = new Error("Comment not found");
      next(error);
      return;
    }
    comment.check = true;
    const confirmedComment = comment.save();
    return res.status(200).json(confirmedComment);
  } catch (err) {
    next(err);
  }
};
export {
  createComment,
  updateComment,
  deleteComment,
  getAllComments,
  approveComment,
};
