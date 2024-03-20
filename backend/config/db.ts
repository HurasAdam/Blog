import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DB_URI as string)
        console.log('Database is connected...')
    } catch (error) {
        console.log(`Error : ${error}`)
        process.exit(1);
    }
}

export default connectDB