import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { CartContext } from "../context/CartContext";
import "./ProductList.css";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const { addToCart, addToWishlist, wishlist } = useContext(CartContext);

  useEffect(() => {
    axios.get("https://fakestoreapi.com/products")
      .then(response => setProducts(response.data))
      .catch(error => console.log(error));
  }, []);

  return (
    <div className="product-list">
      {products.map((product) => (
        <div key={product.id} className="product-card">
          <img src={product.image} alt={product.title} />
          <h3>{product.title}</h3>
          <p>${product.price}</p>
          <div className="btn">
          <button onClick={() => addToCart(product)}>Add to Cart</button>
          <button className="wishlist-btn" onClick={() => addToWishlist(product)}>
            {wishlist.some((item) => item.id === product.id) ? "❤️" : "♡"}
          </button>
          
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
