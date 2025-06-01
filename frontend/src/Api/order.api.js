import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:4000/api/v1",
});

// Get all products
export const fetchAllProducts = () => API.get("/products/all");

// Get a single product by ID
export const fetchSingleProduct = (id) => API.get(`/products/${id}`);

// Create a new product
export const createProduct = (productData) =>
  API.post("/products", productData);

// Checkout order
export const checkoutOrder = (orderData) => {
  console.log("Order Data:", orderData);
  return API.post("/orders/checkout", orderData);
};
// Get order by orderNumber
export const fetchOrderByNumber = (orderNumber) =>
  API.get(`/orders/${orderNumber}`);
