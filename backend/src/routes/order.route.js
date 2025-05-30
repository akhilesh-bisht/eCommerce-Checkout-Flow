// routes/orderRoutes.js
import express from "express";
import { checkoutOrder } from "../controllers/order.controller.js";

const router = express.Router();

// POST route for checkout
router.post("/checkout", checkoutOrder);

export default router;
