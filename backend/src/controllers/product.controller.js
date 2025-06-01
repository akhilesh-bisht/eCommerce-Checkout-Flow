import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const filePath = path.join(__dirname, "..", "data", "products.json");

export const getAllProducts = async (req, res) => {
  try {
    const baseUrl =
      process.env.NODE_ENV === "production"
        ? "https://ecommerce-checkout-flow.onrender.com/images/"
        : "http://localhost:4000/images/";

    const rawData = JSON.parse(fs.readFileSync(filePath, "utf-8"));

    const productData = rawData.map((p) => ({
      ...p,
      image: `${baseUrl}${path.basename(p.image)}`,
    }));

    res.status(200).json(productData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create new product
export const createProduct = async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
