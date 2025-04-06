import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import axios from "axios";
import "./ProductDetails.css";

const ProductDetails = () => {
  const { productName } = useParams();
  const navigate = useNavigate();
  const { addToCart, addToWishlist, wishlist } = useContext(CartContext);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [cartMessage, setCartMessage] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get("https://dummyjson.com/products");
        const apiProducts = response.data.products || []; // Ensure correct API access
        const localProducts = JSON.parse(localStorage.getItem("products")) || [];

        const allProducts = [...apiProducts, ...localProducts];

        // Find the product by matching its slugified title
        const foundProduct = allProducts.find(
          (p) => p.title.replace(/\s+/g, "-").toLowerCase() === productName
        );

        if (foundProduct) {
          setProduct(foundProduct);
        } else {
          setError(true);
        }
      } catch (error) {
        console.error("Error fetching product:", error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productName]);

  const handleAddToCart = (product) => {
    addToCart(product);
    setCartMessage(true);
    setTimeout(() => setCartMessage(false), 3000);
  };

  if (loading) return <p className="loading-message">Loading product details...</p>;
  if (error || !product) return <p className="error-message">Product not found!</p>;

  return (
    <div className="product-details-container">
      {cartMessage && (
        <div className="cartmsg">
          <p>✅ Item added to cart</p>
          <button onClick={() => setCartMessage(false)}>✖</button>
        </div>
      )}

      <button className="back-btn" onClick={() => navigate(-1)}>⬅ Back</button>

      <div className="product-details">
        <img src={product.images?.[0] || product.image} alt={product.title} className="product-image" />
        <div className="product-info">
          <h1>{product.title}</h1>
          <p className="product-price">₹ {product.price * 100}</p>
          <p className="product-description">{product.description || "No description available."}</p>

          <div className="product-actions">
            <button className="add-to-cart" onClick={() => handleAddToCart(product)}>Add to Cart</button>
            <button className="wishlist-btn1" onClick={() => addToWishlist(product)}>
              {wishlist.some((item) => item.id === product.id) ? "❤️ Remove from Wishlist" : "♡ Add to Wishlist"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
