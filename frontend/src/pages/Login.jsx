import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import axios from "axios";

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullname, setFullname] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
    setError("");
  };

  const handleAuth = async (e) => {
    e.preventDefault();
    setLoading(true);

    const url = isLogin
    ? "http://localhost:5001/api/auth/login"
    : "http://localhost:5001/api/auth/register";
  

    const payload = isLogin
      ? { email, password }
      : { fullname, email, password };

    try {
      const response = await axios.post(url, payload, {
        withCredentials: true, // to send/receive cookies
      });

      setLoading(false);
      navigate("/home"); // navigate after successful login/signup
    } catch (err) {
      setLoading(false);
      setError(
        err.response?.data?.message || "Something went wrong. Try again."
      );
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>{isLogin ? "Login" : "Sign Up"}</h2>
        <form onSubmit={handleAuth}>
          {!isLogin && (
            <input
              type="text"
              placeholder="Full Name"
              value={fullname}
              onChange={(e) => setFullname(e.target.value)}
              required
            />
          )}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {error && <p className="error-text">{error}</p>}
          <button type="submit" disabled={loading}>
            {loading ? "Please wait..." : isLogin ? "Login" : "Sign Up"}
          </button>
        </form>

        <p onClick={toggleAuthMode} className="toggle-auth">
          {isLogin
            ? "Don't have an account? Sign Up"
            : "Already have an account? Login"}
        </p>

        <button className="skip-btn" onClick={() => navigate("/home")}>
          Skip & Continue
        </button>
      </div>
    </div>
  );
};

export default Login;
