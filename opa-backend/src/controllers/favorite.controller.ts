import { Request, Response } from "express";
import { pool } from "../database/connection";

export const addFavorite = async (req: Request, res: Response) => {
  try {
    const { userId, productId } = req.body;

    await pool.query(
      `
      INSERT INTO favorites (user_id, product_id)
      VALUES (?, ?)
      `,
      [userId, productId],
    );

    res.status(201).json({
      message: "Product added to favorites",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Error adding favorite",
    });
  }
};

export const getFavorites = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    const [favorites]: any = await pool.query(
      `
      SELECT
        products.*
      FROM favorites
      INNER JOIN products
        ON products.id = favorites.product_id
      WHERE favorites.user_id = ?
      ORDER BY favorites.created_at DESC
      `,
      [userId],
    );

    res.json(favorites);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Error loading favorites",
    });
  }
};

export const removeFavorite = async (req: Request, res: Response) => {
  try {
    const { userId, productId } = req.params;

    await pool.query(
      `
      DELETE FROM favorites
      WHERE user_id = ?
      AND product_id = ?
      `,
      [userId, productId],
    );

    res.json({
      message: "Favorite removed",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Error removing favorite",
    });
  }
};
