import Express, { Response, Request, NextFunction } from "express"

interface customError extends Error {
    statusCode?: number;
}

export const errorResponseHandler = (err: customError, req: Request, res: Response, next: NextFunction) => {

    const statusCode = err.statusCode || 400;
    res.status(statusCode).json({
        message: err.message,
    })
}

export const invalidPathHandler = (req: Request, res: Response, next: NextFunction) => {
    let error: customError = new Error("Invalid Path");
    error.statusCode = 404;
    next(error);
}