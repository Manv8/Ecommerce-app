import React, { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import "./Wishlist.css";

const Wishlist = () => {
  const { wishlist, addToCart, removeFromWishlist } = useContext(CartContext);
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");

  // Handle add to cart with notification
  const handleAddToCart = (item) => {
    addToCart(item);
    setPopupMessage(`${item.title} added to cart!`);
    setShowPopup(true);

    setTimeout(() => {
      setShowPopup(false);
    }, 2000);
  };

  return (
    <div className="wishlist-container">
      <h2>Your Wishlist</h2>

      {wishlist.length === 0 ? (
        <p>Wishlist is empty</p>
      ) : (
        <ul>
          {wishlist.map((item) => (
            <li key={item.id} className="wishlist-item">
              <img src={item.images[0]} alt={item.title} />
              <div className="wishlist-details">
                <h3>{item.title}</h3>
                <p>₹ {item.price.toFixed(2)}</p>
              </div>
              <div className="wishlist-actions">
                <button className="add-cart-btn" onClick={() => handleAddToCart(item)}>
                  Add to Cart
                </button>
                <button className="remove-btn" onClick={() => removeFromWishlist(item.id)}>
                  Remove
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      {/* Popup Notification */}
      {showPopup && <div className="popup-message">{popupMessage}</div>}
    </div>
  );
};

export default Wishlist;
