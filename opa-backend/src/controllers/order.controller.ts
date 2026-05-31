import { Request, Response } from "express";

import { pool } from "../database/connection";

export const createOrder = async (req: Request, res: Response) => {
  try {
    const { userId, total, paymentMethod, items } = req.body;

    const [orderResult]: any = await pool.query(
      `
INSERT INTO orders
(
user_id,
total,
payment_method
)
VALUES
(?,?,?)
`,
      [userId, total, paymentMethod],
    );

    const orderId = orderResult.insertId;

    for (const item of items) {
      await pool.query(
        `
INSERT INTO order_items
(
order_id,
product_id,
quantity,
price
)
VALUES
(?,?,?,?)
`,
        [orderId, item.id, item.quantity || 1, item.price],
      );
    }

    res.status(201).json({
      message: "Order created successfully",
      orderId,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Error creating order",
    });
  }
};
