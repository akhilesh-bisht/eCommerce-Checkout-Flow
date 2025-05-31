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
      quantity: {
        type: Number,
        required: true,
        min: [1, "Quantity must be at least 1"],
      },
      price: { type: Number, required: true },
      subtotal: { type: Number },
      total: { type: Number },
    },

    customer: {
      fullName: { type: String, required: true },
      email: {
        type: String,
        required: [true, "Email is required"],
        validate: {
          validator: function (value) {
            // regex for validating email format
            return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
              value
            );
          },
          message: "Invalid email format",
        },
      },
      phone: {
        type: String,
        required: [true, "Phone number is required"],
        validate: {
          validator: function (value) {
            // Ensure phone number is 10 digits long
            return /^\d{10}$/.test(value);
          },
          message: "Phone number should be exactly 10 digits",
        },
      },
      address: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      zipCode: { type: String, required: true },

      cardNumber: {
        type: String,
        required: [true, "Card number is required"],
      },
      expiryDate: {
        type: String,
        required: true,
        validate: {
          validator: function (value) {
            // Expiry Date  MM/YY format
            return /^(0[1-9]|1[0-2])\/\d{2}$/.test(value);
          },
          message: "Invalid expiry date format. Use MM/YY",
        },
      },
      CVV: {
        type: String,
        required: [true, "CVV is required"],
        validate: {
          validator: function (value) {
            // CVV should be 3 or 4 digits
            return /^\d{3}$/.test(value);
          },
          message: "CVV should be 3 digits",
        },
      },
    },
  },
  { timestamps: true }
);

export const Order = model("Order", orderSchema);
