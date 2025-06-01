import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { checkoutOrder } from "../Api/order.api.js";

export default function CheckoutPage() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const product = state?.product;

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  });

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const quantity = product?.quantity || 1;
  const subtotal = (product?.price || 0) * quantity;
  const total = subtotal;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const generateOrderNumber = () => "ORD" + Date.now();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    const customerInfo = {
      fullName: form.fullName,
      email: form.email,
      phone: form.phone,
      address: form.address,
      city: form.city,
      state: form.state,
      zipCode: form.zip,
      cardNumber: form.cardNumber,
      expiryDate: form.expiryDate,
      CVV: form.cvv,
    };

    const productInfo = {
      id: product.id,
      variant: product.variant || "Default",
      quantity: quantity,
      price: product.price,
      title: product.title,
      description: product.description,
    };

    const transactionOutcome = "approved"; // hardcoded for now

    const payload = {
      customerInfo,
      productInfo,
      transactionOutcome,
    };

    try {
      const response = await checkoutOrder(payload);
      const data = response.data;
      const backendOutcome =
        data.status || data.transactionOutcome || "approved";

      if (backendOutcome === "approved") {
        const orderNumber = generateOrderNumber();
        const order = {
          orderNumber,
          product: productInfo,
          customer: customerInfo,
          total,
          date: new Date().toISOString(),
          status: backendOutcome,
        };

        // Save order locally
        const orders = JSON.parse(localStorage.getItem("orders") || "[]");
        orders.push(order);
        localStorage.setItem("orders", JSON.stringify(orders));

        // Update local product stock
        const products = JSON.parse(localStorage.getItem("products") || "[]");
        const idx = products.findIndex((p) => p.id === product.id);
        if (idx !== -1) {
          products[idx].stock = Math.max(0, products[idx].stock - quantity);
          localStorage.setItem("products", JSON.stringify(products));
        }

        // Navigate to success page passing order data in state
        navigate("/checkout-success", { state: { order } });
      } else if (backendOutcome === "declined") {
        setErrorMsg("Transaction Declined");
      } else {
        setErrorMsg("Payment Failed");
      }
    } catch (error) {
      console.error("Order Checkout Error:", error);
      setErrorMsg("Server error or network issue.");
    }

    setLoading(false);
  };

  if (!product)
    return (
      <p className="text-center text-red-500 mt-10">No product selected.</p>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-white dark:from-gray-900 dark:to-gray-800 py-10 px-4">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10">
        {/* Billing Form */}
        <form
          onSubmit={handleSubmit}
          className="backdrop-blur-lg bg-white/80 dark:bg-gray-900/80 border border-gray-200 dark:border-gray-700 shadow-xl rounded-2xl p-8 space-y-6"
        >
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Checkout
          </h2>

          {Object.entries(form).map(([key, value]) => (
            <div key={key}>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1 capitalize">
                {key.replace(/([A-Z])/g, " $1")}
              </label>
              <input
                type={["email", "phone"].includes(key) ? key : "text"}
                name={key}
                value={value}
                onChange={handleChange}
                maxLength={
                  key === "cardNumber" ? 16 : key === "cvv" ? 3 : undefined
                }
                required
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
              />
            </div>
          ))}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl transition"
          >
            {loading ? "Processing..." : "Complete Purchase"}
          </button>

          {errorMsg && (
            <p className="text-center text-red-500 text-sm mt-2">{errorMsg}</p>
          )}
        </form>

        {/* Order Summary */}
        <div className="rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg p-8 space-y-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Order Summary
          </h2>

          <div className="space-y-2">
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-48 object-contain rounded-lg bg-white dark:bg-gray-800"
            />
            <div>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                {product.title}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {product.description}
              </p>
              <p className="text-sm mt-1">
                <span className="font-semibold">Variant:</span>{" "}
                {product.variant || "Default"}
              </p>
              <p className="text-sm">
                <span className="font-semibold">Quantity:</span> {quantity}
              </p>
            </div>
          </div>

          <div className="pt-4 border-t dark:border-gray-700 space-y-2">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Subtotal: ${subtotal.toFixed(2)}
            </p>
            <p className="text-lg font-bold text-indigo-600 dark:text-indigo-400">
              Total: ${total.toFixed(2)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
