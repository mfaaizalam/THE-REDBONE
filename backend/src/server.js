import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import {connectDB} from "./config/db.js";
import orderRoutes from "./routes/orderRoutes.js"
import productRoutes from "./routes/productRoutes.js"
dotenv.config();

const app = express();



// CORS (Frontend Vercel + Localhost allowed)
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://the-redbone.vercel.app",
      "https://the-redbone-7xuw.vercel.app"
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);


connectDB();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* ─────────────────────────────
   ROUTES
───────────────────────────── */

app.use("/api", orderRoutes);
app.use("/api", productRoutes);

app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

/* ─────────────────────────────
   SERVER LISTEN
───────────────────────────── */
// export default app;

export default app;