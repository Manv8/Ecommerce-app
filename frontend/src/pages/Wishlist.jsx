import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";
import "./Wishlist.css";

const Wishlist = () => {
  const { wishlist, removeFromWishlist, addToCart } = useContext(CartContext);

  return (
    <div className="wishlist-container">
      <h2>Your Wishlist</h2>
      {wishlist.length === 0 ? <p>No items in wishlist</p> : (
        <ul>
          {wishlist.map(item => (
            <li key={item.id}>
              <img src={item.image} alt={item.title} />
              <div>
                <h3>{item.title}</h3>
                <p>${item.price}</p>
                <button onClick={() => addToCart(item)}>Add to Cart</button>
                <button onClick={() => removeFromWishlist(item.id)}>Remove</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Wishlist;
