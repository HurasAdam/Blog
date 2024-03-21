


import { Response, Request, NextFunction } from "express"
import * as types from "../shared/types"
import { verify, JwtPayload } from "jsonwebtoken";
import User from "../models/User";
export const authGuard = async (req: Request, res: Response, next: NextFunction) => {



    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        try {
            const token = req.headers.authorization.split(" ")[1];
            const { id } = verify(token, process.env.JWT_SECRET as string) as JwtPayload;
            // const user = await User.findById(id)

            req.user = id
            next()


        } catch (error) {
            console.log(error)
            let err: types.customError = new Error("Not Authorized,Token failed")
            err.statusCode = 401
            next(err)
        }
    } else {
        let error: types.customError = new Error("Not authorized, No token");
        error.statusCode = 401;
        next(error);
    }

}




