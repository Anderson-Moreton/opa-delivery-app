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

export const getUserOrders = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    const [orders]: any = await pool.query(
      `
SELECT
id,
total,
payment_method,
status,
created_at
FROM orders
WHERE user_id = ?
ORDER BY created_at DESC
`,
      [userId],
    );

    res.json(orders);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Error fetching orders",
    });
  }
};

export const getOrderById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const [orders]: any = await pool.query(
      `
SELECT
id,
user_id,
total,
payment_method,
status,
created_at
FROM orders
WHERE id = ?
`,
      [id],
    );

    if (!orders.length) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    const order = orders[0];

    const [items]: any = await pool.query(
      `
SELECT
oi.quantity,
oi.price,
p.name
FROM order_items oi
INNER JOIN products p
ON p.id = oi.product_id
WHERE oi.order_id = ?
`,
      [id],
    );

    res.json({
      ...order,
      items,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Error fetching order",
    });
  }
};
