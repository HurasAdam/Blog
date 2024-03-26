import express, { Request, Response, NextFunction } from "express"
import cloudinary from "cloudinary";
import multer, { FileFilterCallback } from "multer";
import Post from "../models/Post";
import * as types from "../shared/types"
import { uploadFile } from "../middleware/uploadMiddleware";
import { v4 as uuidv4 } from "uuid";

const createPost = async (req: Request, res: express.Response, next: NextFunction) => {
    try {

        const { title, caption, body } = req.body;
        const file = req.file
        let photo;

        if (file) {
            const b64 = Buffer.from(file.buffer).toString("base64");
            let dataURI = "data:" + file.mimetype + ";base64," + b64;
            const cloudinaryResponseUrl = await cloudinary.v2.uploader.upload(dataURI);
            photo = cloudinaryResponseUrl.url
        }




        const post = new Post({
            title,
            caption,
            slug: uuidv4(),
            body: body,
            photo: photo || "",
            user: req.user
        })


        const createdPost = await post.save();
        return res.status(201).json(createdPost);

    } catch (error) {
        console.log(error)
        next(error)
    }
};

const updatePost = async (req: Request, res: express.Response, next: NextFunction) => {
    const { id } = req.params


    try {
        const { title, caption, slug, body, tags, categories } = req.body;
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
                const err = new Error("An unexpected error occurred while uploading the file.");
                next(err);
                return;
            }

            photo = response.url;
        }

        post.title = title || post.title;
        post.caption = caption || post.caption;
        post.slug = slug || post.slug;
        post.body = body || post.body;
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


const getPost = async (req: Request, res: express.Response, next: NextFunction) => {

    try {
        const { id } = req.params;

        const post = await Post.findById({ _id: id })

        res.status(200).json(post);

    } catch (error) {
        console.log(error);
        next(error);
    }
};




export { createPost, updatePost, getPost };