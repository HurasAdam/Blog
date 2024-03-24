import { Schema, model, Document, Types } from "mongoose";
import * as types from "../shared/types";

const CommentSchema = new Schema<types.IComment>({
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    description: { type: String, required: true },
    postId: { type: Schema.Types.ObjectId, ref: "Post", required: true },
    check: { type: Boolean, default: false },
    parent: { type: Schema.Types.ObjectId, ref: "Comment", default: null },
    replyOnUser: { type: Schema.Types.ObjectId, ref: "User", default: null }

}, { timestamps: true })

CommentSchema.virtual('replies', {
    ref: "Comment",
    localField: "_id",
    foreignField: "parent"
})

const Comment = model<types.IComment>("Comment", CommentSchema);
export default Comment;