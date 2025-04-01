import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "./Login.css";

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate(); // Initialize navigate

  const toggleAuthMode = () => setIsLogin(!isLogin);

  // Function to close login and navigate to homepage
  const handleClose = () => {
    navigate("/"); // Redirect to homepage
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <button className="cancel-button" onClick={handleClose}>&times;</button>
        <h2>{isLogin ? "Login" : "Sign Up"}</h2>
        <form>
          {!isLogin && <input type="text" placeholder="Username" required />}
          <input type="email" placeholder="Email" required />
          <input type="password" placeholder="Password" required />
          <button type="submit">{isLogin ? "Login" : "Sign Up"}</button>
        </form>
        <p onClick={toggleAuthMode}>
          {isLogin ? "Don't have an account? Sign Up" : "Already have an account? Login"}
        </p>
      </div>
    </div>
  );
};

export default Login;
