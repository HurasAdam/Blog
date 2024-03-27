import { Types } from "mongoose";
export interface customError extends Error {
    statusCode?: number;
}

export interface IUserDocument extends IUser, Document {
    generateJWT(): Promise<string>;
    comparePassword(password: string): Promise<boolean>;
    isDirectModified: (password: string) => string
}

export interface IUser {
    avatar: string;
    name: string;
    email: string;
    password: string;
    verified: boolean;
    verificationCode: string;
    admin: boolean
}

export interface IPost {
    title: string;
    caption: string;
    slug: string;
    body: Record<string, any>;
    user: Types.ObjectId;
    photo: string;
    tags: string[];
    categories: Types.ObjectId[];
}

export interface IPostCategory {
    name: string;
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
            user?: string
        }
    }
}
