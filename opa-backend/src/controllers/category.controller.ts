import { Request, Response } from "express";

import { pool } from "../database/connection";

// GET ALL CATEGORIES
export const getCategories = async (req: Request, res: Response) => {
  try {
    const [categories] = await pool.query(`
      SELECT
        c.id,
        c.name,
        COUNT(p.id) as total_products
      FROM categories c
      LEFT JOIN products p
        ON p.category_id = c.id
      GROUP BY c.id
      ORDER BY c.position ASC
    `);

    res.json(categories);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Error fetching categories",
    });
  }
};

// CREATE CATEGORY
export const createCategory = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;

    await pool.query(
      `
        INSERT INTO categories (name)
        VALUES (?)
      `,
      [name],
    );

    res.status(201).json({
      message: "Category created successfully",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Error creating category",
    });
  }
};

// UPDATE CATEGORY
export const updateCategory = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const { name } = req.body;

    // UPDATE CATEGORY TABLE
    await pool.query(
      `
        UPDATE categories
        SET name = ?
        WHERE id = ?
      `,
      [name, id],
    );

    // UPDATE PRODUCTS TABLE
    await pool.query(
      `
        UPDATE products
        SET category = ?
        WHERE category_id = ?
      `,
      [name, id],
    );

    res.json({
      message: "Category updated successfully",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Error updating category",
    });
  }
};

// DELETE CATEGORY
export const deleteCategory = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    await pool.query(
      `
        DELETE FROM categories
        WHERE id = ?
      `,
      [id],
    );

    res.json({
      message: "Category deleted successfully",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Error deleting category",
    });
  }
};

// GET MENU CATEGORIES
export const getMenuCategories = async (req: Request, res: Response) => {
  try {
    const [categories] = await pool.query(`
      SELECT
        c.id,
        c.name,
        COUNT(p.id) as total_products
      FROM categories c
      LEFT JOIN products p
        ON p.category_id = c.id
      GROUP BY c.id
      HAVING total_products > 0
      ORDER BY c.position ASC
    `);

    res.json(categories);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Error fetching menu categories",
    });
  }
};

export const reorderCategories = async (req: Request, res: Response) => {
  try {
    const categories = req.body;

    for (const category of categories) {
      await pool.query(
        `
        UPDATE categories
        SET position = ?
        WHERE id = ?
        `,
        [category.position, category.id],
      );
    }

    res.json({
      message: "Categories reordered successfully",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Error reordering categories",
    });
  }
};
