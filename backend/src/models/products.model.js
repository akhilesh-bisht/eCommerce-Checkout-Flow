import { model, Schema } from "mongoose";

const productSchema = new Schema(
  {
    productId: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    description: String,
    price: { type: Number, required: true },
    image: String,
    variants: [String],
    stock: { type: Number, default: 100 },
  },
  { timestamps: true }
);

export const Product = model("Product", productSchema);
