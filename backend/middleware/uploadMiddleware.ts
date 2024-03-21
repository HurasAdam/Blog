import multer, { FileFilterCallback } from "multer";
import express, { Request, Response } from "express";
import path from "path";

const storage = multer.memoryStorage();

const fileFilter = (req: Request, file: Express.Multer.File, cb: FileFilterCallback) => {
    const allowedMimeTypes = [
        "jpeg",
        "jpg",
        "png",
        "pdf",
        "doc",
        "docx",
        "xls",
        "octet-stream",
    ];

    if (allowedMimeTypes.includes(file.mimetype.split("/")[1])) {
        cb(null, true)
    } else {
        const error = new Error(`LIMIT_UNEXPECTED_FILES${file.fieldname}`) as any;
        cb(error, false);
    }

}


const uploadFile = multer({
    storage,
    fileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024, // 5MB
    },
})


export { uploadFile }