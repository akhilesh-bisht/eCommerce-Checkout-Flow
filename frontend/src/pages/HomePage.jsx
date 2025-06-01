import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ShoppingBag } from "lucide-react";
import Navbar from "../components/Navbar";
import ProductGrid from "../components/ProductGrid";
import { fetchAllProducts } from "../Api/order.api.js";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    async function loadProducts() {
      try {
        const response = await fetchAllProducts(); // from API service
        setProducts(response.data);
        setFilteredProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    }

    loadProducts();
  }, []);

  useEffect(() => {
    const query = searchQuery.toLowerCase();
    const filtered = products.filter((product) =>
      product.title.toLowerCase().includes(query)
    );
    setFilteredProducts(filtered);
  }, [searchQuery, products]);

  const handleSearchChange = (query) => {
    setSearchQuery(query);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-violet-50 to-indigo-50">
        <div className="relative w-24 h-24">
          <div className="absolute top-0 left-0 w-full h-full border-8 border-indigo-200 rounded-full animate-ping opacity-75"></div>
          <div className="absolute top-0 left-0 w-full h-full border-8 border-t-indigo-600 border-indigo-200 rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-violet-50 to-indigo-50">
      <Navbar onSearchChange={handleSearchChange} searchQuery={searchQuery} />

      <div id="products-section" className="container mx-auto px-4 py-12">
        <div className="flex-1">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
              Products
            </h1>
            <div className="flex items-center text-gray-600">
              <ShoppingBag className="mr-2" size={18} />
              <span>{filteredProducts?.length || 0} products</span>
            </div>
          </div>

          {filteredProducts?.length > 0 ? (
            <ProductGrid products={filteredProducts} />
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-16 bg-white rounded-2xl shadow-sm"
            >
              <div className="w-24 h-24 mx-auto mb-6 bg-indigo-100 rounded-full flex items-center justify-center">
                <ShoppingBag size={36} className="text-indigo-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                No products found
              </h2>
              <p className="text-gray-500 max-w-md mx-auto mb-6">
                Try searching with a different product name.
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
