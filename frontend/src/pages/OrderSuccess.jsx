import React from "react";
import { Link } from "react-router-dom";
import "./OrderSuccess.css";

const OrderSuccess = () => {
  return (
    <div className="order-success-container">
      <div className="order-success-card">
        <h2>🎉 Order Placed Successfully!</h2>
        <p>Thank you for your purchase. Your order has been successfully placed.</p>
        <p>You will receive a confirmation email shortly with your order details.</p>
        <Link to="/home" className="home-button">Continue Shopping </Link>
      </div>
    </div>
  );
};

export default OrderSuccess;
