
import mongoose from "mongoose";
import dotenv from "dotenv";

export const connectDB = async()=>{
    try {

        mongoose.connection.on('connected',()=>console.log("MongoDB connected successfully"));
        await mongoose.connect(`${process.env.MONGODB_URI}/chat-app`);
    } catch (error) {
        console.log("Error in DB connection",error);
    }
}     
