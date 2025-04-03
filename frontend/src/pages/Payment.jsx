import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Payment.css";

const Payment = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { formData, total } = location.state || {};

    const [paymentMethod, setPaymentMethod] = useState("");

    // Handle Payment
    const handlePayment = () => {
        if (!paymentMethod) {
            alert("Please select a payment method.");
            return;
        }

        alert(`Payment Successful using ${paymentMethod}!`);
        navigate("/order-success");
    };
    const handelCancel = () => {
        alert(`Payment Unsecussfull `);
        navigate("/cart");
    };

    return (
        <div className="payment-container">
            <h2>Payment</h2>

            {/* User Details Section */}
            <div className="user-details">
                <h3>Order Summary</h3>
                <p><strong>Name:</strong> {formData?.name}</p>
                <p><strong>Email:</strong> {formData?.email}</p>
                <p><strong>Address:</strong> {formData?.address}</p>
                <p><strong>Phone:</strong> {formData?.phone}</p>
                <p className="total-amount"><strong>Total Amount:</strong> ₹{total?.toFixed(2)*100}</p>
            </div>

            {/* Payment Options */}
            <div className="payment-options">
                <h3>Select Payment Method</h3>
                <label>
                    <input type="radio" name="payment" value="Card" onChange={(e) => setPaymentMethod(e.target.value)} />
                    Credit/Debit Card
                </label>
                <label>
                    <input type="radio" name="payment" value="Net Banking" onChange={(e) => setPaymentMethod(e.target.value)} />
                    Net Banking
                </label>
                <label>
                    <input type="radio" name="payment" value="UPI" onChange={(e) => setPaymentMethod(e.target.value)} />
                    UPI (Google Pay, PhonePe, Paytm)
                </label>
                <label>
                    <input type="radio" name="payment" value="Cash on Delivery" onChange={(e) => setPaymentMethod(e.target.value)} />
                    Cash on Delivery
                </label>
            </div>
            <div className="btnDIv">
                <button className="pay-btn" onClick={handlePayment}>Confirm Payment</button>
                <button className="cancel-btn" onClick={handelCancel} >Cancel Payment</button>
            </div>

        </div>
    );
};

export default Payment;
