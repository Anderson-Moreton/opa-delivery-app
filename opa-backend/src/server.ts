import 'dotenv/config';

import express from "express";

import cors from "cors";

import { pool } from "./database/connection";

import productRoutes from "./routes/product.routes";

import categoryRoutes from "./routes/category.routes";

import authRoutes  from "./routes/auth.routes";

import orderRoutes from "./routes/order.routes";

import Stripe from "stripe";

import paymentRoutes from "./routes/payment.routes";

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
