import { Schema, model } from "mongoose";
import * as types from "../shared/types";

const PostTagSchema = new Schema<types.IPostTag>({
    name: { type: String, required: true, unique:true },
}, { timestamps: true })

const Tag = model<types.IPostTag>("Tag", PostTagSchema);
export default Tag;