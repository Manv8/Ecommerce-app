import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import productRoutes from "./routes/productsRouter.js"
import session from 'express-session';
import flash from 'connect-flash';

import authRoutes from "./routes/authRoutes.js";

dotenv.config();

const app = express();

// Middleware
app.use("/api/products", productRoutes);
app.use(cors({ origin:"http://localhost:5173", credentials: true }));
app.use(express.json());
app.use(cookieParser());

// Routes
app.use(session({
  secret: 'vhiviyvviyf', // change this!
  resave: false,
  saveUninitialized: false
}));
app.use(flash());
app.use("/api/auth", authRoutes);

// MongoDB connection
mongoose.connect(process.env.MONGO_URI).then(() => {
  console.log("MongoDB connected");
  app.listen(process.env.PORT || 3000, () => {
    console.log(`Server running...${process.env.PORT}`);
  });
}).catch(err => console.log(err));
