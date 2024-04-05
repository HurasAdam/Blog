import { Schema, model } from "mongoose";
import * as types from "../shared/types";

const PostCategoriesSchema = new Schema<types.IPostCategory>(
  {
    name: { type: String, required: true, unique: true },
    createdBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

const Category = model<types.IPostCategory>("Category", PostCategoriesSchema);
export default Category;
