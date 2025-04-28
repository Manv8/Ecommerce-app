import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { CartContext } from "../context/CartContext";
import { useNavigate, Link } from "react-router-dom";
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
        const response = await axios.get("https://dummyjson.com/products");
        const apiProducts = response.data.products || []; // Access 'products' array correctly
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
    const category = product.category || "Other"; // Ensure category is handled properly
    acc[category] = [...(acc[category] || []), product];
    return acc;
  }, {});

  // Sort categories (optional sorting logic)
  const sortedCategories = Object.entries(groupedProducts).sort(([categoryA], [categoryB]) => {
    // if (categoryA === "Electronics") return -1;
    // if (categoryB === "Electronics") return 1;
    // return 0;
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
                  <Link to={`/product/${product.title.replace(/\s+/g, "-").toLowerCase()}`} className="product-link">
                    <img src={product.images?.[0] || product.image} alt={product.title} />
                    <div className="productDet">
                      <h3>{product.description || "No description available."}</h3>
                      <p>₹ {Math.floor(product.price * 100)}</p>
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
