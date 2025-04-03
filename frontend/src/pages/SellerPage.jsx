import React, { useState, useEffect } from "react";
import "./SellerPage.css";

const SellerPage = ({ onAddProduct }) => {
  const [product, setProduct] = useState({
    title: "",
    price: "",
    image: "",
  });
  const [products, setProducts] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);

  useEffect(() => {
    const storedProducts = JSON.parse(localStorage.getItem("products")) || [];
    setProducts(storedProducts);
  }, []);

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
      let updatedProducts = [...products];

      if (editingIndex !== null) {
        updatedProducts[editingIndex] = product;
        setEditingIndex(null);
      } else {
        updatedProducts.push({ ...product, category: "Local Seller" });
      }

      localStorage.setItem("products", JSON.stringify(updatedProducts));
      setProducts(updatedProducts);
      setProduct({ title: "", price: "", image: "" });

      setShowPopup(true);
      setTimeout(() => setShowPopup(false), 3000);
    } else {
      alert("Please fill in all fields.");
    }
  };

  const handleEditProduct = (index) => {
    setProduct(products[index]);
    setEditingIndex(index);
  };

  const handleRemoveProduct = (index) => {
    const updatedProducts = products.filter((_, i) => i !== index);
    localStorage.setItem("products", JSON.stringify(updatedProducts));
    setProducts(updatedProducts);
  };

  return (
    <div className="seller-page">
      {/* Previous Orders */}
      <div className="section">
        <h2>Your Products</h2>
        {products.length > 0 ? (
          <div className="products-grid">
            {products.map((item, index) => (
              <div key={index} className="product-item">
                <img src={item.image} alt={item.title} className="product-image" />
                <div className="product-details">
                  <h3>{item.title}</h3>
                  <p>₹ {item.price}</p>
                </div>
                <div className="btn-group">
                  <button onClick={() => handleEditProduct(index)} className="edit-btn">Edit</button>
                  <button onClick={() => handleRemoveProduct(index)} className="remove-btn">Remove</button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="no-products">No products added yet.</p>
        )}
      </div>

      {/* Sell a Product */}
      <div className="section">
        <h2>{editingIndex !== null ? "Edit Product" : "Sell Your Product"}</h2>
        <input type="text" name="title" placeholder="Product Title" value={product.title} onChange={handleChange} />
        <input type="number" name="price" placeholder="Price (₹)" value={product.price} onChange={handleChange} />
        <input type="file" accept="image/*" onChange={handleImageChange} />

        {product.image && <img src={product.image} alt="Preview" className="preview-img" />}

        <button onClick={handleSellProduct} className="sell-btn">
          {editingIndex !== null ? "Update Product" : "Sell Product"}
        </button>

        {showPopup && <div className="popup">✅ Product {editingIndex !== null ? "updated" : "added"} successfully!</div>}
      </div>
    </div>
  );
};

export default SellerPage;
