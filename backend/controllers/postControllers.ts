import express, { Request, Response, NextFunction } from "express";
import cloudinary from "cloudinary";
import Post from "../models/Post";
import Comment from "../models/Comment";
import * as types from "../shared/types";
import Category from "../models/PostCategories";

const createPost = async (
  req: Request,
  res: express.Response,
  next: NextFunction
) => {
  try {
    const { title, caption, description, categories, tags, readingTime } =
      req.body;
    const file = req.file;
    let photo;

    if (file) {
      const b64 = Buffer.from(file.buffer).toString("base64");
      let dataURI = "data:" + file.mimetype + ";base64," + b64;
      const cloudinaryResponseUrl = await cloudinary.v2.uploader.upload(
        dataURI
      );
      photo = cloudinaryResponseUrl.url;
    }

    const post = new Post({
      title,
      caption,
      categories,
      tags,
      description: description,
      readingTime,
      photo: photo || "",
      user: req.user,
    });

    const createdPost = await post.save();
    return res.status(201).json(createdPost);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const updatePost = async (
  req: Request,
  res: express.Response,
  next: NextFunction
) => {
  const { id } = req.params;

  try {
    const { title, caption, description, tags, categories, readingTime } = req.body;
    const file = req.file;
    let photo;

    const post = await Post.findById({ _id: id });

    if (!post) {
      const err = new Error("Post was not found");
      next(err);
      return;
    }

    if (file) {
      const b64 = Buffer.from(file.buffer).toString("base64");
      let dataURI = "data:" + file.mimetype + ";base64," + b64;
      const response = await cloudinary.v2.uploader.upload(dataURI);

      if (!response) {
        const err = new Error(
          "An unexpected error occurred while uploading the file."
        );
        next(err);
        return;
      }

      photo = response.url;
    }

    post.title = title || post.title;
    post.caption = caption || post.caption;
    post.description = description || post.description;
    post.readingTime = readingTime || post.readingTime;
    post.tags = tags || post.tags;
    post.photo = photo || post.photo;
    post.categories = categories || post.categories;

    await post.save();

    res.json({ message: "Post updated successfully" });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const getAllPosts = async (
  req: Request,
  res: express.Response,
  next: NextFunction
) => {
  try {
    const filter = req.query.searchKeyword;
    const categoryFilter = req.query.category

    let where: types.IPostWhere = {};
    if (filter && typeof filter === "string") {
      where.title = { $regex: filter, $options: "i" };
    }

    if (categoryFilter && typeof categoryFilter === "string") {

      const category = await Category.findOne({ name: categoryFilter });

      if (category) {
        where.categories = { $in: [category._id] };
      }

    }
    console.log(where)
    let query = Post.find(where);
    const page = parseInt(req?.query?.page as string) || 1;
    const pageSize = parseInt(req?.query?.limit as string) || 10;
    const skip = (page - 1) * pageSize;
    const total = await Post.find(where).countDocuments();
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
          path: "categories",
          select: ["name"],
        },
        {
          path: "tags",
          select: ["name"],
        },
      ])
      .sort({ updatedAt: "descending" });

    return res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

const getPost = async (
  req: Request,
  res: express.Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    const post = await Post.findById({ _id: id }).populate([
      {
        path: "user",
        select: ["name", "avatar"],
      },
      {
        path: "tags",
        select: ["name", "color"],
      },
      {
        path: "categories",
        select: ["name"],
      },

      {
        path: "comments",
        match: {
          check: true,
          parent: null,
        },
        populate: [
          {
            path: "user",
            select: ["avatar", "name"],
          },
          {
            path: "replies",
            match: {
              check: true,
            },
            populate: [
              {
                path: "user",
                select: ["avatar", "name"],
              },
            ],
          },
        ],
      },
    ]);

    if (!post) {
      const err = new Error("Post was not found");
      next(err);
      return;
    }
    res.status(200).json(post);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const deletePost = async (
  req: Request,
  res: express.Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const post = await Post.findOneAndDelete({ _id: id });

    if (!post) {
      const err = new Error("Post was not found");
      next(err);
      return;
    }
    const comments = await Comment.deleteMany({ post: post._id });
    return res.status(200).json({ message: "Post is sucessfully deleted" });
  } catch (err) {
    next(err);
  }
};

export { createPost, updatePost, getAllPosts, getPost, deletePost };
