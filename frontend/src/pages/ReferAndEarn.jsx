import React, { useState } from "react";
import "./ReferAndEarn.css";

const ReferAndEarn = () => {
  const [copied, setCopied] = useState(false);
  const referralCode = "URBAN1234";

  const handleCopy = () => {
    navigator.clipboard.writeText(referralCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="refer-container">
      <h2>Refer & Earn</h2>
      <p>Invite your friends and earn exciting rewards on their first order!</p>

      <div className="referral-box">
        <p>Your Referral Code:</p>
        <div className="referral-code">
          <span>{referralCode}</span>
          <button onClick={handleCopy}>{copied ? "Copied!" : "Copy"}</button>
        </div>
      </div>

      <div className="earnings">
        <p><strong>Total Referrals:</strong> 8</p>
        <p><strong>Total Earnings:</strong> ₹400</p>
      </div>

      <button className="share-button" onClick={() => alert("Share functionality coming soon!")}>
        Share with Friends
      </button>

      <div className="how-it-works">
        <h3>How it Works?</h3>
        <ul>
          <li>1. Share your referral code with friends.</li>
          <li>2. They sign up using your code.</li>
          <li>3. You earn ₹50 when they make their first purchase.</li>
        </ul>
      </div>
    </div>
  );
};

export default ReferAndEarn;
