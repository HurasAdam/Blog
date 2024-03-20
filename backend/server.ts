import express from "express";
import dotenv from "dotenv";



dotenv.config();
const app = express();
app.use(express.json());

app.get('/', (req, res) => {
    res.status(200).json("SERVER IS RUNING...")
})

const PORT = process.env.PORT || 5000


app.listen(PORT, () => console.log(`Server is runing on port : ${PORT}`))