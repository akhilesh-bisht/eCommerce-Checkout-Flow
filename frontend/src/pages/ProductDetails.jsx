import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  Star,
  ArrowLeft,
  ShoppingCart,
  Heart,
  Truck,
  Shield,
  RotateCcw,
} from "lucide-react";

import { addToCart } from "../redux/slices/cartSlice";
import Navbar from "../components/Navbar";

export default function ProductDetail() {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const [addingToCart, setAddingToCart] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart);

  useEffect(() => {
    if (!id) return;

    const fetchProduct = async () => {
      try {
        const response = await fetch(`https://fakestoreapi.com/products/${id}`);
        const data = await response.json();
        setProduct(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching product:", error);
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (!product) return;

    setAddingToCart(true);

    setTimeout(() => {
      dispatch(
        addToCart({
          id: product.id,
          title: product.title,
          price: product.price,
          image: product.image,
          quantity,
        })
      );
      setAddingToCart(false);
    }, 1000); // simulate delay
  };

  const getTotalItems = () => {
    return cart.items.reduce((total, item) => total + item.quantity, 0);
  };

  const increaseQuantity = () => setQuantity((prev) => prev + 1);
  const decreaseQuantity = () =>
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-violet-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800">
        <div className="relative w-24 h-24">
          <div className="absolute top-0 left-0 w-full h-full border-8 border-indigo-200 dark:border-indigo-900 rounded-full animate-ping opacity-75"></div>
          <div className="absolute top-0 left-0 w-full h-full border-8 border-t-indigo-600 dark:border-t-indigo-400 border-indigo-200 dark:border-indigo-900 rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl font-bold">Product not found</h1>
        <button
          onClick={() => navigate("/")}
          className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded-lg"
        >
          Back to Products
        </button>
      </div>
    );
  }

  const productImages = [product.image, product.image, product.image];

  return (
    <div className="min-h-screen bg-gradient-to-r from-violet-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800">
      <Navbar
        cartItemCount={getTotalItems()}
        onSearchChange={() => {}}
        searchQuery=""
      />

      <div className="container mx-auto px-4 py-12">
        <div className="mb-8">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
            aria-label="Back to Products"
          >
            <ArrowLeft size={20} />
            <span>Back to Products</span>
          </button>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="p-8">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="relative aspect-square bg-gray-100 dark:bg-gray-700 rounded-xl flex items-center justify-center p-8 mb-6"
              >
                <img
                  src={productImages[activeImage] || "/placeholder.svg"}
                  alt={product.title}
                  className="max-h-full max-w-full object-contain"
                />
                <button
                  className="absolute top-4 right-4 w-10 h-10 bg-white dark:bg-gray-800 rounded-full shadow-md flex items-center justify-center text-gray-400 hover:text-red-500 transition-colors"
                  aria-label="Add to wishlist"
                >
                  <Heart size={20} />
                </button>
              </motion.div>

              <div className="flex justify-center gap-4">
                {productImages.map((img, index) => (
                  <motion.button
                    key={index}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setActiveImage(index)}
                    className={`w-20 h-20 rounded-lg overflow-hidden border-2 ${
                      activeImage === index
                        ? "border-indigo-600 dark:border-indigo-400"
                        : "border-transparent"
                    }`}
                    aria-label={`View image ${index + 1}`}
                  >
                    <img
                      src={img || "/placeholder.svg"}
                      alt={`${product.title} thumbnail ${index + 1}`}
                      className="w-full h-full object-contain"
                    />
                  </motion.button>
                ))}
              </div>
            </div>

            <div className="p-8 flex flex-col">
              <div className="mb-2 text-sm text-indigo-600 dark:text-indigo-400 font-medium uppercase tracking-wider">
                {product.category}
              </div>

              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                {product.title}
              </h1>

              <div className="flex items-center mb-6">
                <div className="flex">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      size={18}
                      className={
                        i < Math.round(product.rating.rate)
                          ? "fill-amber-400 text-amber-400"
                          : "text-gray-300 dark:text-gray-600"
                      }
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-500 dark:text-gray-400 ml-2">
                  {product.rating.rate} ({product.rating.count} reviews)
                </span>
              </div>

              <p className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
                ${product.price.toFixed(2)}
              </p>

              <div className="bg-gray-50 dark:bg-gray-700/30 rounded-xl p-6 mb-8">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-3">
                  Description
                </h3>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  {product.description}
                </p>
              </div>

              <div className="flex items-center mb-8">
                <span className="text-gray-700 dark:text-gray-300 mr-4">
                  Quantity:
                </span>
                <div className="flex items-center border border-gray-300 dark:border-gray-700 rounded-lg">
                  <button
                    onClick={decreaseQuantity}
                    className="w-10 h-10 flex items-center justify-center text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-l-lg"
                    disabled={quantity <= 1}
                    aria-label="Decrease quantity"
                  >
                    -
                  </button>
                  <span className="w-12 text-center font-medium text-gray-800 dark:text-white">
                    {quantity}
                  </span>
                  <button
                    onClick={increaseQuantity}
                    className="w-10 h-10 flex items-center justify-center text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-r-lg"
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={addingToCart}
                  className={`flex-1 ${
                    addingToCart
                      ? "bg-indigo-400 cursor-not-allowed"
                      : "bg-indigo-600 hover:bg-indigo-700"
                  } text-white py-3 px-6 rounded-xl font-semibold flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all`}
                  onClick={handleAddToCart}
                  aria-label="Add product to cart"
                >
                  {addingToCart ? (
                    <>
                      <svg
                        className="animate-spin h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8v8z"
                        ></path>
                      </svg>
                      Adding...
                    </>
                  ) : (
                    <>
                      <ShoppingCart size={20} />
                      Add to Cart
                    </>
                  )}
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex-1 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-800 dark:text-white py-3 px-6 rounded-xl font-semibold flex items-center justify-center gap-2 transition-colors"
                  aria-label="Add product to wishlist"
                >
                  <Heart size={20} />
                  Add to Wishlist
                </motion.button>
              </div>

              <div className="space-y-4 mt-auto">
                {[
                  {
                    icon: <Truck size={18} />,
                    text: "Free shipping on orders over $50",
                  },
                  {
                    icon: <Shield size={18} />,
                    text: "2 year extended warranty",
                  },
                  {
                    icon: <RotateCcw size={18} />,
                    text: "30 days return policy",
                  },
                ].map((feature, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 text-gray-600 dark:text-gray-400"
                  >
                    <div className="w-8 h-8 bg-indigo-100 dark:bg-indigo-900/30 rounded-full flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                      {feature.icon}
                    </div>
                    <span>{feature.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
