import axios from 'axios';

export const getProducts = async (req, res) => {
  try {
    const response = await axios.get('https://dummyjson.com/products');
    const products = response.data.products;
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch products from API", error: error.message });
  }
};
