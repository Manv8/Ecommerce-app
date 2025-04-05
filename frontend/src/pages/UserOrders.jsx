import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./UserOrders.css";

const UserOrders = () => {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Simulate fetching orders from localStorage or a backend
    const storedOrders = JSON.parse(localStorage.getItem("userOrders")) || [];
    setOrders(storedOrders);
  }, []);

  return (
    <div className="user-orders-container">
      <button className="back-btn" onClick={() => navigate(-1)}>⬅ Back</button>
      <h2>Your Orders</h2>

      {orders.length === 0 ? (
        <p className="no-orders">You have no orders yet.</p>
      ) : (
        <div className="orders-list">
          {orders.map((order, idx) => (
            <div className="order-card" key={idx}>
              <p><strong>Order #{idx + 1}</strong></p>
              <p><strong>Date:</strong> {order.date || "N/A"}</p>
              <p><strong>Status:</strong> {order.status || "Completed"}</p>
              <div className="order-items">
                {order.items.map((item, index) => (
                  <div className="order-item" key={index}>
                    <img src={item.images?.[0] || item.image} alt={item.title} />
                    <div>
                      <p>{item.title}</p>
                      <p>Qty: {item.quantity}</p>
                      <p>₹ {item.price * item.quantity * 100}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserOrders;
