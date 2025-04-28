// routes/authRoutes.js
import express from "express";
import { registerUser, loginUser, logoutUser } from "../controllers/authcontroller.js";
import { isLoggedIn } from "../middlewares/isLoggedIn.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.send("Hello, this is users route");
});

router.post("/register", registerUser);
router.post("/login", isLoggedIn, loginUser);
router.get("/logout", logoutUser);

export default router;
