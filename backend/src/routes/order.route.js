// routes/orderRoutes.js
import express from "express";
import {
  checkoutOrder,
  getOrderByOrderNumber,
} from "../controllers/order.controller.js";

const router = express.Router();

// POST route for checkout
router.post("/checkout", checkoutOrder);
router.get("/:orderNumber", getOrderByOrderNumber);

export default router;
