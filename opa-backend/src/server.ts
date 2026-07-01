import "dotenv/config";

import express from "express";

import cors from "cors";

import { pool } from "./database/connection";

import productRoutes from "./routes/product.routes";

import categoryRoutes from "./routes/category.routes";

import authRoutes from "./routes/auth.routes";

import orderRoutes from "./routes/order.routes";

import paymentRoutes from "./routes/payment.routes";

import contactRoutes from "./routes/contact.routes";

import favoriteRoutes from "./routes/favorite.routes";

import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

const app = express();

app.use(cors());

app.use(express.json());

/* AUTH ROUTES */
app.use("/auth", authRoutes);

/* ORDER ROUTES */
app.use("/orders", orderRoutes);

/* PAYMENT ROUTES */
app.use("/payments", paymentRoutes);

/* CONTACT ROUTES */
app.use("/contact", contactRoutes);

/* FAVORITE ROUTES  */
app.use("/favorites", favoriteRoutes);

/* TEST ROUTE */
app.get("/products-test", (req, res) => {
  res.send("products route works");
});

/* PRODUCTS ROUTES */
app.use("/products", productRoutes);

/* CATEGORIES ROUTES */
app.use("/categories", categoryRoutes);

/* ROOT ROUTE */
app.get("/", async (req, res) => {
  try {
    const connection = await pool.getConnection();

    connection.release();

    res.send("OPA Backend + MySQL");
  } catch (error) {
    res.status(500).send("Database connection error");
  }
});

/* SERVER */
const PORT = 3333;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
