import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";


import "./Cart.css";

const Cart = () => {
  const { cart, updateCartQuantity, removeFromCart } = useContext(CartContext);
  const navigate = useNavigate();
  // Calculate total price based on quantity
  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="cart-container">
      <h2>Your Cart</h2>
      {cart.length === 0 ? (
        <p>Cart is empty</p>
      ) : (
        <>
          <ul>
            {cart.map((item) => (
              <li key={item.id} className="cart-item">
                <img src={item.images[0]} alt={item.title} />
                <div className="cart-details">
                  <h3>{item.title}</h3>
                  <div className="priceDet">
                    <p>₹ {item.price.toFixed(2)}</p>
                    <div className="quantity-controls">
                      <button 
                        onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                        disabled={item.quantity <= 1} // Prevents going below 1
                      >
                        -
                      </button>
                      <span>{item.quantity}</span>
                      <button onClick={() => updateCartQuantity(item.id, item.quantity + 1)}>+</button>
                    </div>
                    <button className="remove-btn" onClick={() => removeFromCart(item.id)}>Remove</button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <div className="cart-footer">
            <h3>Total : ₹ {total.toFixed(2)}</h3>
            <button className="checkout-btn" onClick={() => navigate("/checkout")}>Checkout</button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
