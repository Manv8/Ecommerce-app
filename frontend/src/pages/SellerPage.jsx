import React, { useState } from "react";
import "./SellerPage.css";

const SellerPage = ({ onAddProduct }) => {
  const [product, setProduct] = useState({
    title: "",
    price: "",
    image: "",
  });
  const [showPopup, setShowPopup] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProduct((prev) => ({ ...prev, image: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSellProduct = () => {
    if (product.title && product.price && product.image) {
      const existingProducts = JSON.parse(localStorage.getItem("products")) || [];
      const newProduct = { ...product, category: "Local Seller" };
      const updatedProducts = [...existingProducts, newProduct];
      localStorage.setItem("products", JSON.stringify(updatedProducts));

      onAddProduct(newProduct);
      setProduct({ title: "", price: "", image: "" });

      // ✅ Show popup message on click
      setShowPopup(true);

      // ✅ Hide popup after 3 seconds
      setTimeout(() => setShowPopup(false), 3000);
    } else {
      alert("Please fill in all fields.");
    }
  };

  return (
    <div className="seller-container">
      <h2>Sell Your Product</h2>
      <input type="text" name="title" placeholder="Product Title" value={product.title} onChange={handleChange} />
      <input type="number" name="price" placeholder="Price (₹)" value={product.price} onChange={handleChange} />
      <input type="file" accept="image/*" onChange={handleImageChange} />

      {product.image && <img src={product.image} alt="Preview" className="preview-img" />}
      
      <button onClick={handleSellProduct}>Sell Product</button>

      {/* ✅ Popup message will appear when a product is sold */}
      {showPopup && <div className="popup">✅ Product added successfully!</div>}
    </div>
  );
};

export default SellerPage;
