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
import Payment from "./pages/Payment";
import ProductDetails from "./pages/ProductDetails";
import OrderSuccess from "./pages/OrderSuccess";
import Footer from "./pages/Footer";
import UserOrders from "./pages/UserOrders";
import Jarvis from "./pages/Jarvis";
import RefundPage from "./pages/RefundPage";
import ReferAndEarn from "./pages/ReferAndEarn";
import RewardsPage from "./pages/RewardsPage";

function App() {
  return (
    <CartProvider >
      <Router>
        <Navbar />
        <Routes>
          <Route path="/home" element={<HomePage />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/" element={<Login />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/user" element={<UserPage />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/product/:productName" element={<ProductDetails />} />
          <Route path="/order-success" element={<OrderSuccess />} />
          <Route path="/orders" element={<UserOrders />} />
          <Route path="/jarvis" element={<Jarvis />} />
          <Route path="/refunds" element={<RefundPage />} />
          <Route path="/refer" element={<ReferAndEarn />} />
          <Route path="/rewards" element={<RewardsPage />} />

        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;
