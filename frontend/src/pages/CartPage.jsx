"use client";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ShoppingBag } from "lucide-react";
import { motion } from "framer-motion";

import Navbar from "../components/Navbar";
import Cart from "../components/Cart";
import { loadCart } from "../redux/slices/cartSlice";
import { useSelector } from "react-redux";

export default function CartPage() {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  console.log(`cart`, cart);
  console.log(`cart.items`, cart.items);

  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      dispatch(loadCart(JSON.parse(savedCart)));
    }
  }, [dispatch]);

  const getTotalItems = () => {
    return cart?.items?.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-violet-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800">
      <Navbar
        cartItemCount={getTotalItems()}
        onSearchChange={() => {}}
        searchQuery=""
      />

      <div className="container mx-auto px-4 py-12">
        <div className="flex items-center mb-8">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
          >
            <ArrowLeft size={20} />
            <span>Continue Shopping</span>
          </button>
        </div>

        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
          Your Shopping Cart
        </h1>
        {(cart?.items?.length ?? 0) === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-12 text-center"
          >
            <div className="w-24 h-24 mx-auto mb-6 bg-indigo-100 dark:bg-indigo-900/30 rounded-full flex items-center justify-center">
              <ShoppingBag
                size={36}
                className="text-indigo-600 dark:text-indigo-400"
              />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
              Your cart is empty
            </h2>
            <p className="text-gray-500 dark:text-gray-400 mb-8 max-w-md mx-auto">
              Looks like you haven't added any products to your cart yet.
              Explore our collection to find something you'll love.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-semibold shadow-md hover:shadow-lg transition-all"
              onClick={() => navigate("/")}
            >
              Start Shopping
            </motion.button>
          </motion.div>
        ) : (
          <Cart />
        )}
      </div>
    </div>
  );
}
