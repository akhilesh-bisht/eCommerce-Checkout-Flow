"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
function ProductCardSimpleVariant({ product }) {
  const navigate = useNavigate();
  const variants = product?.variants || [];
  const [selectedVariant, setSelectedVariant] = useState(
    variants.length > 0 ? variants[0] : ""
  );
  const [quantity, setQuantity] = useState(1);

  const handleVariantChange = (e) => {
    setSelectedVariant(e.target.value);
  };

  const incrementQuantity = () => setQuantity((q) => q + 1);
  const decrementQuantity = () => setQuantity((q) => (q > 1 ? q - 1 : 1));

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="max-w-sm bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 flex flex-col"
    >
      {/* Product Image */}
      <img
        src={product?.image || "/placeholder.svg"}
        alt={product?.title || "Product Image"}
        className="w-full h-64 object-contain mb-4"
      />

      {/* Title */}
      <h2 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
        {product?.title || "No Title"}
      </h2>

      {/* Description */}
      <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
        {product?.description || "No description available."}
      </p>

      {/* Price */}
      <p className="text-2xl font-bold text-indigo-600 dark:text-indigo-400 mb-4">
        ${product?.price?.toFixed(2) || "0.00"}
      </p>

      {/* Variant Selector */}
      {variants.length > 0 && (
        <div className="mb-4">
          <label
            htmlFor={`variant-select-${product.id}`}
            className="block text-gray-700 dark:text-gray-300 mb-1 font-medium"
          >
            Select Variant:
          </label>
          <select
            id={`variant-select-${product.id}`}
            value={selectedVariant}
            onChange={handleVariantChange}
            className="w-full p-2 border rounded-md dark:bg-gray-700 dark:text-white"
          >
            {variants.map((variant, idx) => (
              <option key={idx} value={variant}>
                {variant}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Quantity Selector */}
      <div className="mb-4 flex items-center gap-4">
        <label className="text-gray-700 dark:text-gray-300 font-medium">
          Quantity:
        </label>
        <div className="flex items-center border rounded-md overflow-hidden">
          <button
            onClick={decrementQuantity}
            className="px-3 py-1 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600"
            aria-label="Decrease quantity"
          >
            -
          </button>
          <input
            type="number"
            min={1}
            value={quantity}
            readOnly
            className="w-12 text-center bg-white dark:bg-gray-800 dark:text-white"
            aria-label="Quantity"
          />
          <button
            onClick={incrementQuantity}
            className="px-3 py-1 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600"
            aria-label="Increase quantity"
          >
            +
          </button>
        </div>
      </div>

      {/* Buy Now Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="mt-auto bg-indigo-600 text-white py-2 rounded-md font-semibold hover:bg-indigo-700"
        aria-label={`Buy ${product?.title} now`}
        onClick={() => {
          navigate("/checkout", {
            state: {
              product: {
                ...product,
                variant: selectedVariant,
                quantity,
              },
            },
          });
        }}
      >
        Buy Now
      </motion.button>
    </motion.div>
  );
}

// ProductGrid component to render list of products
export default function ProductGrid({ products }) {
  console.log("Rendering ProductGrid with products:", products);

  if (!products || products.length === 0) {
    return <p className="text-center p-10">No products found.</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-4">
      {products.map((product) =>
        product ? (
          <ProductCardSimpleVariant
            key={product.id || product._id}
            product={product}
          />
        ) : null
      )}
    </div>
  );
}
