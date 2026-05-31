import express from "express";

import cors from "cors";

import { pool } from "./database/connection";

import productRoutes from "./routes/product.routes";

import categoryRoutes from "./routes/category.routes";

import authRoutes  from "./routes/auth.routes";

import orderRoutes from "./routes/order.routes";

const app = express();

app.use(cors());

app.use(express.json());

/* AUTH ROUTES */
app.use("/auth", authRoutes);

/* ORDER ROUTES */
app.use("/orders", orderRoutes);

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

    console.log("MySQL connected");

    connection.release();

    res.send("OPA Backend + MySQL");
  } catch (error) {
    console.log(error);

    res.status(500).send("Database connection error");
  }
});

/* SERVER */

const PORT = 3333;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
