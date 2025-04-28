import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { FaUser } from "react-icons/fa6";
import "./UserPage.css";

const UserPage = () => {
  const { cart } = useContext(CartContext);
  const navigate = useNavigate();

  // Dummy user data (Replace with actual user data)
  const user = {
    name: "Manvender Singh",
    email: "manvvvv@example.com",
    profilePic: "data:image/jpeg;base64,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",
    orders: [
      { id: 1, item: "Nike Shoes", price: 2500, status: "Delivered" },
      { id: 2, item: "Wireless Earbuds", price: 1800, status: "Shipped" },
    ],
  };

  // Logout function
  const handleLogout = () => {
    alert("Logged out successfully!");
    navigate("/"); // Redirect to homepage after logout
  };

  return (
    <div className="user-container">
      <div className="user-header">
        <img src={user.profilePic} alt="Profile" className="profile-pic" />
        <h2>{user.name}</h2>
        <p>{user.email}</p>
      </div>

      <div className="user-options">
        <button onClick={() => navigate("/orders")}>Order History</button>
        <button onClick={() => navigate("/jarvis")}>Help & Support</button>
        <button onClick={() => navigate("/refunds")}>Refunds</button>
        <button onClick={() => navigate("/refer")}>Refer & Earn</button>
        <button onClick={() => navigate("/rewards")}>Rewards</button>
        
        <button className="logout-btn" onClick={handleLogout}>Logout</button>
      </div>

      <div className="order-section">
        <h3>Your Orders</h3>
        {user.orders.length > 0 ? (
          <ul>
            {user.orders.map((order) => (
              <li key={order.id}>
                <span>{order.item}</span>
                <span>₹{order.price}</span>
                <span className={`status ${order.status.toLowerCase()}`}>{order.status}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p>No orders found.</p>
        )}
      </div>
    </div>
  );
};

export default UserPage;