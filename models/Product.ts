// models/Product.ts
import mongoose, { Schema, model, models } from "mongoose";

const ProductSchema = new Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    description: String,
    originalPrice: { type: Number, required: true },
    offerPrice: { type: Number, required: true },
    stock: { type: Number, default: 0 },
    images: [String],
    category: String,
    isPopular: { type: Boolean, default: false },
    sellerId: { type: Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

export const Product = models.Product || model("Product", ProductSchema);
