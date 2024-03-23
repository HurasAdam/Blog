import express from "express";
import dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary"
import "dotenv/config";
import connectDB from "./config/db";
import cors from "cors";

// Routes
import userRoutes from "./routes/userRoutes"
import { errorResponseHandler, invalidPathHandler } from "./middleware/errorHandler";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})





const app = express();
app.use(express.json());
app.use(cors({
    origin: process.env.FRONTED_URL
}));

app.get('/', (req, res) => {
    res.status(200).json("SERVER IS RUNING...")
})




app.use('/api/users', userRoutes);
app.use(invalidPathHandler)
app.use(errorResponseHandler);


const PORT = process.env.PORT || 5000

connectDB().then(() => {
    app.listen(PORT, () => console.log(`Server is runing on port : ${PORT}`))
})
