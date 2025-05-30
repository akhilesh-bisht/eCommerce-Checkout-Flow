import { Schema, model, Types } from "mongoose";

const orderSchema = new Schema(
  {
    orderNumber: { type: String, required: true, unique: true },

    status: {
      type: String,
      enum: ["approved", "declined", "failed"],
      required: true,
    },

    product: {
      id: { type: Types.ObjectId, ref: "Product", required: true },
      title: { type: String, required: true },
      variant: { type: String },
      quantity: { type: Number, required: true },
      price: { type: Number, required: true },
    },

    customer: {
      fullName: { type: String, required: true },
      email: { type: String, required: true },
      phone: { type: String, required: true },
      address: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      zipCode: { type: String, required: true },
    },

    payment: {
      cardNumberMasked: { type: String, required: true },
      expiryDate: { type: Date, required: true },
    },

    subtotal: { type: Number, required: true },
    total: { type: Number, required: true },
  },
  { timestamps: true }
);

export const Order = model("Order", orderSchema);
