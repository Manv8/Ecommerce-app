import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Cart from "./pages/Cart";
import Wishlist from "./pages/Wishlist";
import Navbar from "./pages/Navbar";
import { CartProvider } from "./context/CartContext";
import Login from "./pages/Login";
import Checkout from "./pages/Checkout";
import UserPage from "./pages/UserPage";
import SellerPage from "./pages/SellerPage";

function App() {
  return (
    <CartProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/home" element={<HomePage />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/" element={<Login />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/user" element={<UserPage />} />
          <Route path="/seller" element={<SellerPage />} />
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;
