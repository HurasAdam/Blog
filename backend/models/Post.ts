import { Schema, model, Document, Types } from "mongoose";

import * as types from "../shared/types";

const PostSchema = new Schema<types.IPost>(
  {
    title: { type: String, required: true },
    caption: { type: String, requied: true },
    description: { type: String, required: true },
    readingTime: { type: String, required: true },
    user: { type: Schema.Types.ObjectId, ref: "User" },
    photo: { type: String, required: false },
    tags: [{ type: Schema.Types.ObjectId, ref: "Tag" }],
    categories: [{ type: Schema.Types.ObjectId, ref: "Category" }],
  },
  { timestamps: true, toJSON: { virtuals: true } }
);

PostSchema.virtual("comments", {
  ref: "Comment",
  localField: "_id",
  foreignField: "post",
});

const Post = model<types.IPost>("Post", PostSchema);
export default Post;
