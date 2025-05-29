import { Schema, model, Types } from "mongoose";

const orderSchema = new Schema(
  {
    orderNumber: { type: String, required: true, unique: true },
    productId: { type: Types.ObjectId, ref: "Product", required: true },
    variant: String,
    quantity: { type: Number, required: true },
    total: { type: Number, required: true },
    customerId: { type: Types.ObjectId, ref: "Customer", required: true },
  },
  { timestamps: true }
);

export const Order = model("Order", orderSchema);
