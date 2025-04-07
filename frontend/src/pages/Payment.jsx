import React, { useState, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import "./Payment.css";

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { formData, total } = location.state || {};
  const { cartItems, clearCart } = useContext(CartContext);

  const [paymentMethod, setPaymentMethod] = useState("");

  const handlePayment = () => {
    if (!paymentMethod) {
      alert("Please select a payment method.");
      return;
    }

    const newOrder = {
      items: cartItems,
      user: formData,
      totalAmount: Math.floor(total?.toFixed(2) * 100),
      paymentMethod,
      status: "Completed",
      date: new Date().toLocaleString(),
    };

    // Save to localStorage
    const existingOrders = JSON.parse(localStorage.getItem("userOrders")) || [];
    const updatedOrders = [...existingOrders, newOrder];
    localStorage.setItem("userOrders", JSON.stringify(updatedOrders));

    // Clear cart after successful payment
    clearCart();

    alert(`✅ Payment Successful using ${paymentMethod}!`);
    navigate("/order-success");
  };

  const handleCancel = () => {
    alert("❌ Payment Unsuccessful");
    navigate("/cart");
  };

  return (
    <div className="payment-container">
      <h2>Payment</h2>

      {/* User Details */}
      <div className="user-details">
        <h3>Order Summary</h3>
        <p><strong>Name:</strong> {formData?.name}</p>
        <p><strong>Email:</strong> {formData?.email}</p>
        <p><strong>Address:</strong> {formData?.address}</p>
        <p><strong>Phone:</strong> {formData?.phone}</p>
        <p className="total-amount"><strong>Total Amount:</strong> ₹{Math.floor(total?.toFixed(2) * 100)}</p>
      </div>

      {/* Payment Options */}
      <div className="payment-options">
        <h3>Select Payment Method</h3>
        {["Card", "Net Banking", "UPI", "Cash on Delivery"].map((method) => (
          <label key={method}>
            <input
              type="radio"
              name="payment"
              value={method}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            {method}
          </label>
        ))}
      </div>

      <div className="btnDIv">
        <button className="pay-btn" onClick={handlePayment}>Confirm Payment</button>
        <button className="cancel-btn" onClick={handleCancel}>Cancel Payment</button>
      </div>
    </div>
  );
};

export default Payment;
