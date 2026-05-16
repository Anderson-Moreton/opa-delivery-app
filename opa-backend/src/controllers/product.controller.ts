import { Request, Response } from 'express';

import { pool } from '../database/connection';

export const getProducts = async (
  req: Request,
  res: Response
) => {

  try {

    const [products] = await pool.query(
      'SELECT * FROM products ORDER BY id DESC'
    );

    res.json(products);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: 'Error fetching products'
    });

  }

};

export const createProduct = async (
  req: Request,
  res: Response
) => {

  try {

    const {
      name,
      description,
      price,
      category,
      image
    } = req.body;

    const [result] = await pool.query(

      `
        INSERT INTO products
        (name, description, price, category, image)
        VALUES (?, ?, ?, ?, ?)
      `,

      [
        name,
        description,
        price,
        category,
        image
      ]

    );

    res.status(201).json({
      message: 'Product created successfully'
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: 'Error creating product'
    });

  }

};

export const deleteProduct = async (
  req: Request,
  res: Response
) => {

  try {

    const { id } = req.params;

    await pool.query(
      'DELETE FROM products WHERE id = ?',
      [id]
    );

    res.json({
      message: 'Product deleted successfully'
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: 'Error deleting product'
    });

  }

};

export const updateProduct = async (
  req: Request,
  res: Response
) => {

  try {

    const { id } = req.params;

    const {
      name,
      description,
      price,
      category,
      image
    } = req.body;

    await pool.query(
      `
        UPDATE products
        SET
          name = ?,
          description = ?,
          price = ?,
          category = ?,
          image = ?
        WHERE id = ?
      `,
      [
        name,
        description,
        price,
        category,
        image,
        id
      ]
    );

    res.json({
      message: 'Product updated successfully'
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: 'Error updating product'
    });

  }

};