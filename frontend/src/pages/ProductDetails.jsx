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
  const [reviews, setReviews] = useState([]);
  
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get("https://dummyjson.com/products");
        const apiProducts = response.data.products || []; // Ensure correct API access
        const localProducts = JSON.parse(localStorage.getItem("products")) || [];

        const allProducts = [...apiProducts, ...localProducts];

        const foundProduct = allProducts.find(
          (p) => p.title.replace(/\s+/g, "-").toLowerCase() === productName
        );

        if (foundProduct) {
          setProduct(foundProduct);
          setReviews(foundProduct.reviews || []); // Assuming product reviews are part of the product data
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

  const calculateAverageRating = () => {
    if (reviews.length === 0) return 0;
    const totalRating = reviews.reduce((acc, review) => acc + review.rating, 0);
    return totalRating / reviews.length;
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
          <p className="product-price">₹ {Math.floor(product.price * 100)}</p>
          <p className="product-description">{product.description || "No description available."}</p>

          <div className="product-rating">
            <p className="average-rating">Average Rating: {calculateAverageRating().toFixed(1)} / 5</p>
            <div className="stars">
              {Array(5).fill().map((_, index) => (
                <span key={index} className={`star ${index < calculateAverageRating() ? "filled" : ""}`}>
                  ★
                </span>
              ))}
            </div>
          </div>

          <div className="product-actions">
            <button className="add-to-cart" onClick={() => handleAddToCart(product)}>Add to Cart</button>
            <button className="wishlist-btn1" onClick={() => addToWishlist(product)}>
              {wishlist.some((item) => item.id === product.id) ? "❤️ Remove from Wishlist" : "♡ Add to Wishlist"}
            </button>
          </div>
        </div>
      </div>

      {reviews.length > 0 && (
        <div className="reviews-section">
          <h2>Customer Reviews</h2>
          {reviews.map((review, index) => (
            <div key={index} className="review-item">
              <div className="review-header">
                <p className="review-author">John Doe</p>
                <div className="review-stars">
                  {Array(5).fill().map((_, i) => (
                    <span key={i} className={`star ${i < review.rating ? "filled" : ""}`}>
                      ★
                    </span>
                  ))}
                </div>
              </div>
              <p className="review-text">{review.text}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
