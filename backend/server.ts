import express, { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary"
import "dotenv/config";
import connectDB from "./config/db";
import cors from "cors";
import bodyParser from "body-parser";

// Routes
import userRoutes from "./routes/userRoutes"
import postRoutes from "./routes/postsRoutes"
import comentRoutes from "./routes/commentRoutes"
import { errorResponseHandler, invalidPathHandler } from "./middleware/errorHandler";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

const app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors({
    origin: process.env.FRONTED_URL,
    exposedHeaders: [
        "x-totalpagecount",
        "x-filter",
        "x-totalcount",
        "x-currentpage",
        "x-pageSize"
    ]
}));
app.use((_req: Request, res: Response, next: NextFunction) => {
    res.header('Content-Type', 'application/json;charset=UTF-8');
    res.header('Access-Control-Allow-Credentials', 'true');
    next();
});


app.get('/', (req, res) => {
    res.status(200).json("SERVER IS RUNING...")
})


app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/comments', comentRoutes);

app.use(invalidPathHandler)
app.use(errorResponseHandler);


const PORT = process.env.PORT || 5000

connectDB().then(() => {
    app.listen(PORT, () => console.log(`Server is runing on port : ${PORT}`))
})
