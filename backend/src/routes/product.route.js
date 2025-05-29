import { Router } from "express";
import {
  createProduct,
  getAllProducts,
  getProductById,
  deleteProduct,
  updateProduct,
} from "../controllers/product.controller.js";
const router = Router();

// Get all products
router.get("/all", getAllProducts);

// Get single product by ID
router.get("/:id", getProductById);

// Create new product
router.post("/", createProduct);

// Update product
router.put("/:id", updateProduct);

// Delete product
router.delete("/:id", deleteProduct);

export default router;
