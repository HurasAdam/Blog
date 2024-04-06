import { Types } from "mongoose";
export interface customError extends Error {
  statusCode?: number;
}

export interface IUserDocument extends IUser, Document {
  generateJWT(): Promise<string>;
  comparePassword(password: string): Promise<boolean>;
  isDirectModified: (password: string) => string;
}

export interface IUser {
  avatar: string;
  name: string;
  email: string;
  password: string;
  verified: boolean;
  verificationCode: string;
  admin: boolean;
}

export interface IPost {
  title: string;
  caption: string;
  description: string;
  readingTime: string;
  user: Types.ObjectId;
  photo: string;
  tags: string[];
  categories: Types.ObjectId[];
}

export interface IPostCategory {
  name: string;
  createdBy: Types.ObjectId;
  description: string;
}
export interface IPostTag {
  name: string;
  color: string;
  createdBy: Types.ObjectId;
}

export interface IComment {
  user: Types.ObjectId;
  description: string;
  post: Types.ObjectId;
  check: boolean;
  parent: Types.ObjectId;
  replyOnUser: Types.ObjectId;
}

declare global {
  namespace Express {
    interface Request {
      user?: string;
      query: {
        searchKeyword?: string;
        page?: string;
        limit?: string;
      };
    }
  }
}

export interface IPostWhere {
  title?: { $regex: string; $options: string };
}

export interface ICommentWhere {
  check?: boolean | undefined;
  user?: {};
  title?: { $regex: string; $options: string } | undefined;
}

export interface ICategoryWhere {
  name?: { $regex: string; $options: string };
}
export interface IUserWhere {
  $or?: { name?: { $regex: string; $options: string }; email?: { $regex: string; $options: string } }[];
  name?: { $regex: string; $options: string };
}