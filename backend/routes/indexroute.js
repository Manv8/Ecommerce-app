import express from "express";
import { registerUser, loginUser, logoutUser } from "../controllers/authcontroller.js";
import { isLoggedIn } from "../middlewares/isLoggedIn.js";

const router = express.Router();

// Public route
router.get("/", (req, res) => {
  res.send("Welcome to User API");
});

// Register
router.post("/register", registerUser);

// Login
router.post("/login", loginUser);

// Logout
router.get("/logout", logoutUser);

// ✅ Index route - returns user info if logged in
router.get("/me", isLoggedIn, (req, res) => {
  res.status(200).json({
    message: "User info",
    user: req.user,
  });
});

export default router;
