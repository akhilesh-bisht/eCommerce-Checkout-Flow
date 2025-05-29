import { Schema, model } from "mongoose";

const customerSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: String,
    address: String,
    city: String,
    state: String,
    zip: String,
  },
  { timestamps: true }
);

export const Customer = model("Customer", customerSchema);
