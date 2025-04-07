import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullname, setFullname] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
    setError("");
  };

  const handleAuth = async (e) => {
    e.preventDefault();

    const url = isLogin
      ? "http://localhost:3000/api/auth/login"
      : "http://localhost:3000/api/auth/register";

    const payload = isLogin
      ? { email, password }
      : { fullname, email, password };

    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        credentials: "include",
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("token", data.token);
        navigate("/home");
      } else {
        setError(data.message || "Authentication failed");
      }
    } catch (err) {
      setError("Server error. Please try again later.");
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
          <button type="submit">{isLogin ? "Login" : "Sign Up"}</button>
        </form>

        <p onClick={toggleAuthMode} className="toggle-auth">
          {isLogin
            ? "Don't have an account? Sign Up"
            : "Already have an account? Login"}
        </p>

        {/* ✅ Skip Button */}
        <button
          className="skip-btn"
          onClick={() => navigate("/home")}
        >
          Skip & Continue
        </button>
      </div>
    </div>
  );
};

export default Login;
