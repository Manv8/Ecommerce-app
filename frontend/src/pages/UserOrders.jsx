import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import jsPDF from "jspdf";
import "jspdf-autotable";
import "./UserOrders.css";

const UserOrders = () => {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    try {
      const storedOrders = JSON.parse(localStorage.getItem("userOrders")) || [];
      setOrders(storedOrders);
    } catch (error) {
      console.error("Failed to parse user orders:", error);
      setOrders([]);
    }
  }, []);

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString(); // e.g., "4/3/2025, 3:25:43 PM"
  };

  const handleReorder = (items) => {
    const existingCart = JSON.parse(localStorage.getItem("cart")) || [];
    const updatedCart = [...existingCart, ...items];
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    navigate("/cart");
  };

  const handleExportToPDF = (order, idx) => {
    const doc = new jsPDF();
    doc.text(`Order #${idx + 1}`, 14, 20);
    doc.text(`Date: ${formatDate(order.date)}`, 14, 30);
    doc.text(`Status: ${order.status || "Completed"}`, 14, 40);

    const rows = order.items?.map((item) => [
      item.title,
      item.quantity,
      `₹${(item.price * 100).toLocaleString()}`,
      `₹${(item.price * item.quantity * 100).toLocaleString()}`
    ]) || [];

    doc.autoTable({
      startY: 50,
      head: [["Title", "Quantity", "Price", "Total"]],
      body: rows
    });

    doc.save(`order_${idx + 1}.pdf`);
  };

  return (
    <div className="user-orders-container">
      <button className="back-btn" onClick={() => navigate(-1)}>⬅ Back</button>
      <h2>Your Orders</h2>

      {orders.length === 0 ? (
        <p className="no-orders">You have no orders yet.</p>
      ) : (
        <div className="orders-list">
          {orders.map((order, idx) => {
            const totalAmount = order.items?.reduce((acc, item) => acc + item.price * item.quantity, 0) || 0;
            const totalItems = order.items?.reduce((acc, item) => acc + item.quantity, 0) || 0;

            return (
              <div className="order-card" key={idx}>
                <p><strong>Order #{idx + 1}</strong></p>
                <p><strong>Date:</strong> {formatDate(order.date)}</p>
                <p><strong>Status:</strong> {order.status || "Delivered"}</p>
                <p><strong>Total Items:</strong> {totalItems}</p>
                <p><strong>Total Paid:</strong> ₹{(totalAmount * 100).toLocaleString()}</p>

                <div className="order-items">
                  {(order.items || []).map((item, index) => (
                    <div className="order-item" key={index}>
                      <img
                        src={item.images?.[0] || item.image || "https://via.placeholder.com/100"}
                        alt={item.title || "Product"}
                      />
                      <div className="orderdet">
                        <p><strong>{item.title || "No Title"}</strong></p>
                        <p>Qty: {item.quantity || 1}</p>
                        <p>Price: ₹{(item.price * 100).toLocaleString()}</p>
                        <p>Total: ₹{(item.price * item.quantity * 100).toLocaleString()}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="order-actions">
                  <button className="reorder-btn" onClick={() => handleReorder(order.items)}>Reorder</button>
                  <button className="export-btn" onClick={() => handleExportToPDF(order, idx)}>Export to PDF</button>
                  <p className="delivery-status">🟢 Delivered</p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default UserOrders;
