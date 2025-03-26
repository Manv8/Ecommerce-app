import React from "react";
import "./Navbar.css";

const Navbar = () => {
    return (
        <nav className="navbar">
            <h1>Urban Cart</h1>
            <ul>
                <li><a href="/">Home</a></li>
                <li><a href="/cart">Cart</a></li>
                <li><a href="/wishlist">Wishlist</a></li>
                <li><a href="/login">Login</a></li>
            </ul>
        </nav>
    );
};

export default Navbar;
