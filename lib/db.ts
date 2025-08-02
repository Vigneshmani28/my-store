import mongoose from "mongoose";
import { Product } from "@/models/Product";

let isConnected = false;

export const connectDB = async () => {
    if (isConnected) {
        console.log("MongoDB is already connected");
        return;
    }
    
    try {
        await mongoose.connect(process.env.MONGODB_URI!, {
            dbName: "my-store",
            bufferCommands: false,
        });
        isConnected = true;
        console.log("MongoDB connected successfully");
    } catch (error) {
        console.error("MongoDB connection error:", error);
    }
}


export async function getProductBySlug(slug: string) {
  await connectDB();
  return Product.findOne({ slug }).lean();
}
