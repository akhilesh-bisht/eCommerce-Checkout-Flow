"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Filter, ChevronDown, ChevronUp, Check } from "lucide-react";

/**
 * FilterSidebar component handles filtering products by category and price.
 * It supports responsive design with a collapsible mobile view and a fixed desktop sidebar.
 */
export default function FilterSidebar({
  selectedCategory,
  onCategoryChange,
  priceRange,
  onPriceChange,
  maxPrice,
}) {
  // State to toggle mobile filter sidebar visibility
  const [isOpen, setIsOpen] = useState(false);
  // Local price range state to control slider independently before applying
  const [localPriceRange, setLocalPriceRange] = useState(priceRange);

  // Handler when a category is clicked; delegates to parent callback
  const handleCategoryClick = (category) => {
    onCategoryChange(category);
  };

  // Handler for price range slider changes; updates local price range state
  const handlePriceChange = (e) => {
    const value = parseInt(e.target.value);
    setLocalPriceRange([priceRange[0], value]);
  };

  // Applies the locally selected price filter by calling parent callback
  const applyPriceFilter = () => {
    onPriceChange(localPriceRange);
  };

  // Resets all filters to default values: no category, full price range
  const resetFilters = () => {
    onCategoryChange(null);
    onPriceChange([0, maxPrice]);
    setLocalPriceRange([0, maxPrice]);
  };

  return (
    <>
      {/* Mobile Filter Button: toggles sidebar visibility */}
      <div className="md:hidden mb-4">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex items-center justify-between bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm"
          aria-expanded={isOpen}
          aria-controls="mobile-filter-sidebar"
        >
          <div className="flex items-center gap-2">
            <Filter
              size={18}
              className="text-indigo-600 dark:text-indigo-400"
              aria-hidden="true"
            />
            <span className="font-medium text-gray-800 dark:text-white">
              Filters
            </span>
          </div>
          {/* Toggle icon: ChevronUp if open, ChevronDown if closed */}
          {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </motion.button>
      </div>

      {/* Mobile Filter Sidebar: collapsible content with animations */}
      {isOpen && (
        <motion.div
          id="mobile-filter-sidebar"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 mb-6"
        >
          <FilterContent
            selectedCategory={selectedCategory}
            onCategoryChange={handleCategoryClick}
            priceRange={localPriceRange}
            maxPrice={maxPrice}
            onPriceChange={handlePriceChange}
            applyPriceFilter={applyPriceFilter}
            resetFilters={resetFilters}
          />
        </motion.div>
      )}

      {/* Desktop Filter Sidebar: always visible and sticky */}
      <div className="hidden md:block w-72 bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 h-fit sticky top-24">
        <FilterContent
          selectedCategory={selectedCategory}
          onCategoryChange={handleCategoryClick}
          priceRange={localPriceRange}
          maxPrice={maxPrice}
          onPriceChange={handlePriceChange}
          applyPriceFilter={applyPriceFilter}
          resetFilters={resetFilters}
        />
      </div>
    </>
  );
}

/**
 * FilterContent component contains the filter options UI:
 * - Category selection buttons
 * - Price range slider with apply button
 * - Reset all filters button
 */
function FilterContent({
  selectedCategory,
  onCategoryChange,
  priceRange,
  maxPrice,
  onPriceChange,
  applyPriceFilter,
  resetFilters,
}) {
  return (
    <>
      {/* Filters Header */}
      <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-6">
        Filters
      </h2>

      {/* Category Selection */}
      <div className="mb-8">
        <h3 className="font-medium text-gray-700 dark:text-gray-300 mb-4">
          Categories
        </h3>
        <div className="space-y-2">
          {/* Button for all categories */}
          <CategoryButton
            isSelected={selectedCategory === null}
            onClick={() => onCategoryChange(null)}
            label="All Products"
          />
          {/* Buttons for specific categories */}
          <CategoryButton
            isSelected={selectedCategory === "men's clothing"}
            onClick={() => onCategoryChange("men's clothing")}
            label="Men's Clothing"
          />
          <CategoryButton
            isSelected={selectedCategory === "women's clothing"}
            onClick={() => onCategoryChange("women's clothing")}
            label="Women's Clothing"
          />
          <CategoryButton
            isSelected={selectedCategory === "others"}
            onClick={() => onCategoryChange("others")}
            label="Others"
          />
        </div>
      </div>

      {/* Price Range Slider */}
      <div className="mb-8">
        <h3 className="font-medium text-gray-700 dark:text-gray-300 mb-4">
          Price Range
        </h3>
        <div className="space-y-6">
          {/* Display current min and max price values */}
          <div className="flex justify-between items-center">
            <span className="text-gray-600 dark:text-gray-400 text-sm">
              ${priceRange[0].toFixed(2)}
            </span>
            <span className="text-gray-600 dark:text-gray-400 text-sm">
              ${priceRange[1].toFixed(2)}
            </span>
          </div>

          {/* Price range input slider */}
          <div className="relative">
            {/* Background track */}
            <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-1 bg-gray-200 dark:bg-gray-700 rounded"></div>
            <input
              type="range"
              min={0}
              max={Math.ceil(maxPrice)}
              value={priceRange[1]}
              onChange={onPriceChange}
              className="w-full h-1 appearance-none bg-transparent [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-indigo-600 dark:[&::-webkit-slider-thumb]:bg-indigo-400 [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white dark:[&::-webkit-slider-thumb]:border-gray-800 [&::-webkit-slider-thumb]:relative [&::-webkit-slider-thumb]:z-10"
              aria-valuemin={0}
              aria-valuemax={maxPrice}
              aria-valuenow={priceRange[1]}
              aria-label="Maximum price filter"
            />
          </div>

          {/* Button to apply the selected price filter */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={applyPriceFilter}
            className="w-full bg-indigo-50 dark:bg-indigo-900/20 hover:bg-indigo-100 dark:hover:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 py-2 rounded-lg text-sm font-medium transition-colors"
          >
            Apply Price Filter
          </motion.button>
        </div>
      </div>

      {/* Reset All Filters Button */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={resetFilters}
        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg text-sm font-medium transition-colors"
      >
        Reset All Filters
      </motion.button>
    </>
  );
}

/**
 * CategoryButton component renders a button for a category filter option.
 * Shows a check icon if selected.
 */
function CategoryButton({ isSelected, onClick, label }) {
  return (
    <motion.button
      whileHover={{ x: 4 }}
      onClick={onClick}
      className={`w-full flex items-center justify-between px-3 py-2 rounded-lg transition-colors ${
        isSelected
          ? "bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 font-medium"
          : "hover:bg-gray-100 dark:hover:bg-gray-700/30 text-gray-700 dark:text-gray-300"
      }`}
      aria-pressed={isSelected}
      role="button"
    >
      <span>{label}</span>
      {/* Show check icon only if selected */}
      {isSelected && (
        <Check size={16} className="text-indigo-600 dark:text-indigo-400" />
      )}
    </motion.button>
  );
}
