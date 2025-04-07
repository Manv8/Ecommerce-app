import express from 'express';
import { getProducts } from '../controllers/productController.js';

const router = express.Router();

router.get("/all", async (req, res) => {
    try {
      const response = await axios.get("https://dummyjson.com/products");
      res.json(response.data.products);
    } catch (err) {
      res.status(500).json({ error: "Failed to fetch products" });
    }
  });
  

export default router;
