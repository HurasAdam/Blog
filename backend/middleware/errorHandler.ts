import Express, { Response, Request, NextFunction } from "express"
import * as types from "../shared/types";



export const errorResponseHandler = (err: types.customError, req: Request, res: Response, next: NextFunction) => {

    const statusCode = err.statusCode || 400;
    res.status(statusCode).json({
        message: err.message,
    })
}

export const invalidPathHandler = (req: Request, res: Response, next: NextFunction) => {
    let error: types.customError = new Error("Invalid Path");
    error.statusCode = 404;
    next(error);
}