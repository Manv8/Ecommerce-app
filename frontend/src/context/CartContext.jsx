import React, { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

const safeParse = (key) => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : [];
  } catch (error) {
    console.error(`Error parsing localStorage key "${key}":`, error);
    return [];
  }
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => safeParse("cart"));
  const [wishlist, setWishlist] = useState(() => safeParse("wishlist"));
  const [cartItems, setCartItems] = useState(() => safeParse("cartItems"));

  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem("cartItems");
  };

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [cart, wishlist]);

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const updateCartQuantity = (id, quantity) => {
    if (quantity < 1) {
      removeFromCart(id);
    } else {
      setCart((prevCart) =>
        prevCart.map((item) => (item.id === id ? { ...item, quantity } : item))
      );
    }
  };

  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  const addToWishlist = (product) => {
    setWishlist((prevWishlist) => {
      if (!prevWishlist.some((item) => item.id === product.id)) {
        return [...prevWishlist, product];
      }
      return prevWishlist;
    });
  };

  const removeFromWishlist = (id) => {
    setWishlist((prevWishlist) => prevWishlist.filter((item) => item.id !== id));
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        clearCart,
        cart,
        wishlist,
        addToCart,
        updateCartQuantity,
        removeFromCart,
        addToWishlist,
        removeFromWishlist
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
