import { Schema, model, Document, Types } from "mongoose";

import * as types from "../shared/types";


const PostSchema = new Schema<types.IPost>({
    title: { type: String, required: true },
    caption: { type: String, requied: true },
    slug: { type: String, required: true, unique: true },
    body: { type: Object, required: false },
    user: { type: Schema.Types.ObjectId, ref: "User" },
    photo: { type: String, required: false },
    tags: { type: [String] },
    categories: [{ type: Schema.Types.ObjectId, ref: "PostCategories" }]


}, { timestamps: true })

PostSchema.virtual('comments', {
    ref: "Comments",
    localField: "_id",
    foreignField: "postId"
})

const Post = model<types.IPost>("Post", PostSchema);
export default Post;