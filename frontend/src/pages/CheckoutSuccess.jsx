import React from "react";
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

export default function CheckoutSuccess() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const order = state?.order;

  if (!order) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gray-50 dark:bg-gray-900">
        <p className="text-red-600 text-xl font-semibold mb-4">
          No order details found. Please place an order first.
        </p>
        <button
          onClick={() => navigate("/")}
          className="mt-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg shadow-md transition"
        >
          Go Home
        </button>
      </div>
    );
  }

  const { orderNumber, product, customer, total, date } = order;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 px-6 py-12">
      <motion.div
        initial={{ opacity: 0, scale: 0.85, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="max-w-lg w-full bg-white dark:bg-gray-800 rounded-xl shadow-lg p-10"
      >
        <motion.div
          initial={{ rotate: -90 }}
          animate={{ rotate: 0 }}
          transition={{ type: "spring", stiffness: 130 }}
          className="text-blue-500 mb-8 flex justify-center"
        >
          <CheckCircle size={80} strokeWidth={1.5} />
        </motion.div>

        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-6 text-center">
          Order Confirmed!
        </h1>

        <p className="text-center text-gray-700 dark:text-gray-300 mb-6">
          Thanks for your purchase. Your order has been successfully processed.
        </p>

        <div className="mb-8 space-y-4">
          <div className="bg-gray-50 dark:bg-gray-700 rounded-md p-4">
            <h2 className="text-lg font-semibold text-blue-600 dark:text-blue-400 mb-2">
              Order Details
            </h2>
            <p>
              <strong>Order Number:</strong> {orderNumber}
            </p>
            <p>
              <strong>Date:</strong> {new Date(date).toLocaleString()}
            </p>
            <p>
              <strong>Total Paid:</strong>{" "}
              <span className="font-semibold">${total.toFixed(2)}</span>
            </p>
          </div>

          <div className="bg-gray-50 dark:bg-gray-700 rounded-md p-4">
            <h2 className="text-lg font-semibold text-blue-600 dark:text-blue-400 mb-2">
              Product Summary
            </h2>
            <p>
              <strong>{product.title}</strong>
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
              {product.description}
            </p>
            <p>
              Variant: <span className="italic">{product.variant}</span>
            </p>
            <p>Quantity: {product.quantity}</p>
            <p>Price per item: ${product.price.toFixed(2)}</p>
          </div>

          <div className="bg-gray-50 dark:bg-gray-700 rounded-md p-4">
            <h2 className="text-lg font-semibold text-blue-600 dark:text-blue-400 mb-2">
              Customer Information
            </h2>
            <p>
              <strong>Name:</strong> {customer.fullName}
            </p>
            <p>
              <strong>Email:</strong> {customer.email}
            </p>
            <p>
              <strong>Phone:</strong> {customer.phone}
            </p>
            <p>
              <strong>Address:</strong> {customer.address}
            </p>
            <p>
              <strong>City/State/Zip:</strong> {customer.city}, {customer.state}{" "}
              {customer.zipCode}
            </p>
          </div>
        </div>

        <button
          onClick={() => navigate("/")}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl shadow-md font-semibold transition"
        >
          Back to Home
        </button>
      </motion.div>
    </div>
  );
}
