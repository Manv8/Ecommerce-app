import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import "./ProductDetails.css";

const ProductDetails = () => {
  const { productName } = useParams();
  const navigate = useNavigate();
  const { addToCart, addToWishlist, wishlist } = useContext(CartContext);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
   const [cartMessage, setCartMessage] = useState(false);

   const handleAddToCart = (product) => {
       addToCart(product);
       setCartMessage(true);
       setTimeout(() => setCartMessage(false), 3000);
     };
  useEffect(() => {
    const fetchProduct = async () => {
        

      try {
        const products = JSON.parse(localStorage.getItem("products")) || [];
        const response = await fetch("https://api.escuelajs.co/api/v1/products");
        const apiProducts = await response.json();
        
        const allProducts = [...apiProducts, ...products];
        const foundProduct = allProducts.find((p) => p.title.replace(/\s+/g, "-").toLowerCase() === productName);

        if (foundProduct) {
          setProduct(foundProduct);
        } else {
          setError(true);
        }

        setLoading(false);
      } catch (err) {
        console.error("Error fetching product details:", err);
        setError(true);
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productName]);

  if (loading) return <p className="loading-message">Loading product details...</p>;
  if (error) return <p className="error-message">Product not found!</p>;

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
        <img src={product.images ? product.images[0] : product.image} alt={product.title} className="product-image" />
        <div className="product-info">
          <h1>{product.title}</h1>
          <p className="product-price">₹ {product.price * 100}</p>
          <p className="product-description">{product.description || "No description available."}</p>

          <div className="product-actions">
            <button className="add-to-cart" onClick={() => handleAddToCart(product)}>Add to Cart</button>
            <button className="wishlist-btn" onClick={() => addToWishlist(product)}>
              {wishlist.some((item) => item.id === product.id) ? "❤️ Remove from Wishlist" : "♡ Add to Wishlist"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
