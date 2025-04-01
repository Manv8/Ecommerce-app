import React, { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { FaUser } from "react-icons/fa6";
import "./Navbar.css";

const Navbar = () => {
  const location = useLocation();
  const [activeIndex, setActiveIndex] = useState(0);
  const [indicatorStyle, setIndicatorStyle] = useState({});

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Cart", path: "/cart" },
    { name: "Wishlist", path: "/wishlist" },
    { name: "Login", path: "/login" },
    { name: "Seller", path: "/seller" },
    { name: <FaUser />, path: "/user" },
  ];

  useEffect(() => {
    const currentIndex = navItems.findIndex((item) => item.path === location.pathname);
    setActiveIndex(currentIndex !== -1 ? currentIndex : 0);

    // Adjust indicator position dynamically
    const listItem = document.querySelectorAll(".navbar ul li")[currentIndex];
    if (listItem) {
      setIndicatorStyle({
        width: `${listItem.offsetWidth}px`,
        left: `${listItem.offsetLeft}px`,
      });
    }
  }, [location.pathname]);

  return (
    <nav className="navbar">
      <h1>Urban Cart</h1>
      <ul>
        {navItems.map((item, index) => (
          <li key={index} className={index === activeIndex ? "active" : ""}>
            <Link to={item.path}>{item.name}</Link>
          </li>
        ))}
        <div className="nav-indicator" style={indicatorStyle}></div>
      </ul>
    </nav>
  );
};

export default Navbar;
