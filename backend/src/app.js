import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
const app = express();

// Enable cors
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "*",
    credentials: true,
  })
);

//parse json
app.use(express.json());
//parse payload
app.use(
  express.urlencoded({
    extended: true,
  })
);
// Serve static files from /public
app.use(express.static("public"));

// Parse cookies
app.use(cookieParser());

// >>>>   Routes imports >>>>>
import productRoutes from "./routes/product.route.js";
import orderRoutes from "./routes/order.route.js";

// <<<< routes declarations   >>>>
app.use("/api/v1/products", productRoutes);
app.use("/api/v1/orders", orderRoutes);

export { app };
