import { Schema, model } from "mongoose";
import * as types from "../shared/types";

const PostCategoriesSchema = new Schema<types.IPostCategory>({
    name: { type: String, required: true },
}, { timestamps: true })

const User = model<types.IPostCategory>("Post", PostCategoriesSchema);
export default User;