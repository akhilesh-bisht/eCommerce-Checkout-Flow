import { Schema, model, Types } from "mongoose";

const transactionSchema = new Schema(
  {
    orderId: { type: Types.ObjectId, ref: "Order", required: true },
    status: {
      type: String,
      enum: ["approved", "declined", "failed"],
      required: true,
    },
  },
  { timestamps: true }
);

export const Transaction = model("Transaction", transactionSchema);
