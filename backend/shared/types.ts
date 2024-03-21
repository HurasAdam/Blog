import { verify, JwtPayload } from "jsonwebtoken";
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



declare global {
    namespace Express {
        interface Request {
            user?: string
        }
    }
}
