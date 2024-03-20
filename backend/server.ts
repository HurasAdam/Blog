import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db";


// Routes
import userRoutes from "./routes/userRoutes"


dotenv.config();

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
    res.status(200).json("SERVER IS RUNING...")
})


app.use('/api/users', userRoutes)


const PORT = process.env.PORT || 5000

connectDB().then(() => {
    app.listen(PORT, () => console.log(`Server is runing on port : ${PORT}`))
})
