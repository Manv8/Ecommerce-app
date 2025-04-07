import React, { useState, useEffect } from "react";
import "./RewardsPage.css";

const RewardsPage = () => {
  const [rewards, setRewards] = useState(0);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    // Simulate reward data fetch
    const rewardPoints = 250; // Example: total reward points
    const rewardHistory = [
      { id: 1, type: "Referral Bonus", points: 50, date: "2025-04-01" },
      { id: 2, type: "First Purchase", points: 100, date: "2025-03-28" },
      { id: 3, type: "Review Bonus", points: 100, date: "2025-03-25" },
    ];

    setRewards(rewardPoints);
    setHistory(rewardHistory);
  }, []);

  return (
    <div className="rewards-container">
      <h2>Your Rewards</h2>

      <div className="reward-summary">
        <p>Total Reward Points</p>
        <h3>{rewards} Points</h3>
        <button className="redeem-btn">Redeem Now</button>
      </div>

      <div className="reward-history">
        <h4>Reward History</h4>
        {history.length === 0 ? (
          <p>No reward history found.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Type</th>
                <th>Points</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {history.map((item, idx) => (
                <tr key={item.id}>
                  <td>{idx + 1}</td>
                  <td>{item.type}</td>
                  <td>{item.points}</td>
                  <td>{new Date(item.date).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default RewardsPage;
