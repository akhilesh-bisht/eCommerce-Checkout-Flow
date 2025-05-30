// controllers/orderController.js
import { Order } from "../models/order.model.js";
import { Product } from "../models/products.model.js";
import { generateOrderNumber } from "../utils/orderUtils.js";
// import { sendConfirmationEmail } from "../utils/email.js"; // Optional

export const checkoutOrder = async (req, res) => {
  const { customerInfo, productInfo, transactionOutcome } = req.body;

  console.log("Customer:", customerInfo);
  console.log("Product Info:", productInfo);
  console.log("Transaction Outcome:", transactionOutcome);

  try {
    if (!productInfo?.id || !productInfo?.quantity) {
      return res
        .status(400)
        .json({ message: "Product information is incomplete" });
    }

    const expiryDate = new Date(productInfo.expiryDate);
    if (expiryDate <= new Date()) {
      return res.status(400).json({ message: "Invalid card expiry date" });
    }

    const orderNumber = generateOrderNumber();
    const product = await Product.findById(productInfo.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    if (product.stock < productInfo.quantity) {
      return res.status(400).json({ message: "Not enough stock available" });
    }

    // Update stock only if transaction is approved
    if (transactionOutcome === "approved") {
      product.stock -= productInfo.quantity;
      await product.save();
    }

    const subtotal = product.price * productInfo.quantity;
    const total = subtotal;

    const newOrder = new Order({
      orderNumber,
      status: transactionOutcome,
      product: {
        id: product._id,
        title: product.title,
        variant: productInfo.variant || "Default",
        quantity: productInfo.quantity,
        price: product.price,
      },
      customer: customerInfo,
      payment: {
        cardNumberMasked: "**** **** **** " + productInfo.cardNumber?.slice(-4),
        expiryDate: productInfo.expiryDate,
      },
      subtotal,
      total,
    });

    await newOrder.save();

    // Optionally send confirmation email
    // await sendConfirmationEmail(customerInfo.email, transactionOutcome, orderNumber, productInfo, customerInfo);

    res.status(201).json({
      orderNumber,
      status: transactionOutcome,
      subtotal,
      total,
      message:
        transactionOutcome === "approved"
          ? "Transaction successful"
          : "Transaction failed or declined",
    });
  } catch (error) {
    console.error("Order Checkout Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
// Get order by order number
export const getOrderByOrderNumber = async (req, res) => {
  const { orderNumber } = req.params;

  try {
    const order = await Order.findOne({ orderNumber });

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json(order);
  } catch (error) {
    console.error("Get Order Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
