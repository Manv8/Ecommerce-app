import React, { useState, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import "./Payment.css";


const Payment = () => {
  const [otpSent, setOtpSent] = useState(false);
const [otp, setOtp] = useState("");
const [userOtp, setUserOtp] = useState("");

  const location = useLocation();
  const navigate = useNavigate();
  const { formData, total } = location.state || {};
  const { cartItems, clearCart } = useContext(CartContext);

  const [paymentMethod, setPaymentMethod] = useState("");
  const [cardDetails, setCardDetails] = useState({ number: "", cvv: "", expiry: "" });
  const [upiId, setUpiId] = useState("");
  const [selectedBank, setSelectedBank] = useState("");

  const handlePayment = () => {
    if (!paymentMethod) {
      alert("Please select a payment method.");
      return;
    }
  
    if (paymentMethod === "Card" && (!cardDetails.number || !cardDetails.cvv || !cardDetails.expiry)) {
      alert("Please fill all Card details.");
      return;
    }
  
    if (paymentMethod === "UPI" && !upiId) {
      alert("Please enter UPI ID.");
      return;
    }
  
    if (paymentMethod === "Net Banking" && !selectedBank) {
      alert("Please select a Bank.");
      return;
    }
  
    // Generate 4-digit OTP
    const generatedOtp = Math.floor(1000 + Math.random() * 9000).toString();
    setOtp(generatedOtp);
    setOtpSent(true);
  
    // For real project, call SMS API here to send `generatedOtp` to user phone number
    alert(`🔒 OTP Sent to your phone number: ${formData.phone}\n(For demo OTP is: ${generatedOtp})`);
  };
  const handleVerifyOtp = () => {
    if (userOtp === otp) {
      // OTP matched, place the order
      const newOrder = {
        items: cartItems,
        user: formData,
        totalAmount: Math.floor(total?.toFixed(2) * 100),
        paymentMethod,
        status: "Completed",
        date: new Date().toLocaleString(),
      };
  
      const existingOrders = JSON.parse(localStorage.getItem("userOrders")) || [];
      const updatedOrders = [...existingOrders, newOrder];
      localStorage.setItem("userOrders", JSON.stringify(updatedOrders));
  
      clearCart();
      alert("✅ OTP Verified! Payment Successful!");
      navigate("/order-success");
    } else {
      alert("❌ Invalid OTP. Please try again.");
    }
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
          <label key={method} className="payment-option">
            <input
              type="radio"
              name="payment"
              value={method}
              onChange={(e) => {
                setPaymentMethod(e.target.value);
                // Reset fields when changing payment method
                setCardDetails({ number: "", cvv: "", expiry: "" });
                setUpiId("");
                setSelectedBank("");
              }}
              checked={paymentMethod === method}
            />
            {method}
          </label>
        ))}
      </div>

      {/* Payment Details Based on Method */}
      {paymentMethod === "Card" && (
        <div className="payment-details">
          <input
            type="text"
            placeholder="Card Number"
            value={cardDetails.number}
            onChange={(e) => setCardDetails({ ...cardDetails, number: e.target.value })}
          />
          <input
            type="text"
            placeholder="CVV"
            value={cardDetails.cvv}
            onChange={(e) => setCardDetails({ ...cardDetails, cvv: e.target.value })}
          />
          <input
            type="text"
            placeholder="Expiry Date (MM/YY)"
            value={cardDetails.expiry}
            onChange={(e) => setCardDetails({ ...cardDetails, expiry: e.target.value })}
          />
        </div>
      )}

      {paymentMethod === "UPI" && (
        <div className="payment-details">
          <input
            type="text"
            placeholder="Enter UPI ID"
            value={upiId}
            onChange={(e) => setUpiId(e.target.value)}
          />
        </div>
      )}

      {paymentMethod === "Net Banking" && (
        <div className="payment-details">
          <select
            value={selectedBank}
            onChange={(e) => setSelectedBank(e.target.value)}
          >
            <option value="">Select Bank</option>
            <option value="HDFC Bank">HDFC Bank</option>
            <option value="ICICI Bank">ICICI Bank</option>
            <option value="SBI Bank">SBI Bank</option>
            <option value="Axis Bank">Axis Bank</option>
          </select>
        </div>
      )}

      {/* Buttons */}
      <div className="btnDIv">
        <button className="pay-btn" onClick={handlePayment}>Confirm Payment</button>
        <button className="cancel-btn" onClick={handleCancel}>Cancel Payment</button>
        
      </div>
      {otpSent && (
  <div className="otp-section">
    <h3>Enter OTP sent to your phone</h3>
    <input
      type="text"
      placeholder="Enter OTP"
      value={userOtp}
      onChange={(e) => setUserOtp(e.target.value)}
    />
    <button className="verify-btn" onClick={handleVerifyOtp}>Verify OTP</button>
  </div>
)}

    </div>
  );
};

export default Payment;
