import { Router } from "express";
import {
  createProduct,
  getAllProducts,
  getProductById,
} from "../controllers/product.controller.js";
const router = Router();

// Get all products
router.get("/all", getAllProducts);

// Get single product by ID
router.get("/:id", getProductById);

// Create new product
router.post("/", createProduct);

export default router;
