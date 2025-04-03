import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { CartContext } from "../context/CartContext";
import { useNavigate, Link } from "react-router-dom"; // Import Link
import "./ProductList.css";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const { addToCart, addToWishlist, wishlist } = useContext(CartContext);
  const [cartMessage, setCartMessage] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("https://api.escuelajs.co/api/v1/products");
        const apiProducts = response.data || [];
        const localProducts = JSON.parse(localStorage.getItem("products")) || [];

        setProducts([...apiProducts, ...localProducts]);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setError(true);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleAddToCart = (product) => {
    addToCart(product);
    setCartMessage(true);
    setTimeout(() => setCartMessage(false), 3000);
  };

  // Group products by category
  const groupedProducts = products.reduce((acc, product) => {
    const category = product.category?.name || product.category || "Other";
    acc[category] = [...(acc[category] || []), product];
    return acc;
  }, {});

  // Sort categories
  const sortedCategories = Object.entries(groupedProducts).sort(([categoryA], [categoryB]) => {
    if (categoryA === "Electronics") return -1;  // Move "Electronics" to the top
    if (categoryB === "Electronics") return 1;
    if (categoryA === "Updated Category Name") return 1; // Move "Updated Category Name" to the bottom
    if (categoryB === "Updated Category Name") return -1;
    return 0; // Keep other categories in their original order
  });

  return (
    <div className="product-list-container">
      {cartMessage && (
        <div className="cartmsg">
          <p>✅ Item added to cart</p>
          <button onClick={() => setCartMessage(false)}>✖</button>
        </div>
      )}

      {loading ? (
        <p className="loading-message">Loading products...</p>
      ) : error ? (
        <p className="error-message">Failed to load products. Please try again later.</p>
      ) : (
        sortedCategories.map(([category, categoryProducts]) => (
          <div key={category} className="category-section">
            <h2 className="category-title">{category.toUpperCase()}</h2>
            <div className="product-grid">
              {categoryProducts.map((product, index) => (
                <div key={product.id || index} className="product-card animate" style={{ animationDelay: `${index * 0.1}s` }}>
                  {/* ✅ Wrapped image and title inside Link for product page navigation */}
                  <Link to={`/product/${product.title.replace(/\s+/g, "-").toLowerCase()}`} className="product-link">
                    <img src={product.images ? product.images[0] : product.image} alt={product.title} />
                    <div className="productDet">
                      <p>₹ {product.price * 100}</p>
                    </div>
                  </Link>
                  
                  <div className="btn">
                    <button className="addToCartBtn" onClick={() => handleAddToCart(product)}>Add to Cart</button>
                    <p className="wishlist-btn" onClick={() => addToWishlist(product)}>
                      {wishlist.some((item) => item.id === product.id) ? "❤️" : "♡"}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default ProductList;