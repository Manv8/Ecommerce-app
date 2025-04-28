import React, { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import "./Checkout.css"; // Custom CSS for styling

const Checkout = () => {
  const { cart } = useContext(CartContext);
  const navigate = useNavigate();

  // Calculate total price
  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    phone: "",
  });

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Order Placed:", formData);
    navigate("/payment", { state: { formData, total } });
  };

  return (
    <div className="checkout-container">
      <h2>Checkout</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          required
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          required
          onChange={handleChange}
        />
        <input
          type="text"
          name="address"
          placeholder="Shipping Address"
          required
          onChange={handleChange}
        />
        <input
          type="text"
          name="phone"
          placeholder="Phone Number"
          required
          onChange={handleChange}
        />
        
        <div className="total-amount">
          <h3>Total Amount: ₹ {Math.floor(total.toFixed(2) * 100)}</h3>
        </div>

        <button type="submit">Proceed to Payment</button>
      </form>
    </div>
  );
};

export default Checkout;
