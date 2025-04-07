import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./RefundPage.css";

const RefundPage = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [reason, setReason] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const storedOrders = JSON.parse(localStorage.getItem("userOrders")) || [];
    setOrders(storedOrders);
  }, []);

  const handleRefundSubmit = (e) => {
    e.preventDefault();

    if (!selectedOrder || !reason) {
      alert("Please select an order and reason.");
      return;
    }

    alert(`Refund request submitted for Order #${selectedOrder} with reason: ${reason}`);
    setSelectedOrder(null);
    setReason("");
    setMessage("");
  };

  return (
    <div className="refund-container">
      <button className="back-button" onClick={() => navigate(-1)}>⬅ Back</button>
      <h2>Refund Request</h2>

      {orders.length === 0 ? (
        <p className="no-orders">No previous orders found.</p>
      ) : (
        <form onSubmit={handleRefundSubmit} className="refund-form">
          <div className="form-group">
            <label>Select Order:</label>
            <select
              value={selectedOrder || ""}
              onChange={(e) => setSelectedOrder(e.target.value)}
            >
              <option value="" disabled>Select an order</option>
              {orders.map((order, idx) => (
                <option key={idx} value={idx}>
                  Order #{idx + 1} - {new Date(order.date).toLocaleDateString()}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Reason for Refund:</label>
            <select
              value={reason}
              onChange={(e) => setReason(e.target.value)}
            >
              <option value="">Select a reason</option>
              <option value="Damaged product">Damaged product</option>
              <option value="Wrong item received">Wrong item received</option>
              <option value="Late delivery">Late delivery</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="form-group">
            <label>Additional Comments (optional):</label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Tell us more about the issue..."
            />
          </div>

          <button type="submit" className="submit-button">
            Submit Refund Request
          </button>
        </form>
      )}
    </div>
  );
};

export default RefundPage;
