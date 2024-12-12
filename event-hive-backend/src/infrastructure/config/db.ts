import mongoose from "mongoose";

const DB_STRING: string = process.env.DB_STRING || 'mongodb://127.0.0.1:27017/event-hive';

const connectDb = async () => {
    try {
        await mongoose.connect(DB_STRING, {
            serverSelectionTimeoutMS: 30000, // Wait for 30 seconds before timing out
            socketTimeoutMS: 45000,          // Allow 45 seconds for socket connection
        });
        
        console.log(`Database connected on ${mongoose.connection.host}`);
    } catch (error) {
        console.error('Database connection error:', error);
    }
}

export default connectDb;
