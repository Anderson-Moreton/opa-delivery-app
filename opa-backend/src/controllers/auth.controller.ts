import { Request, Response } from "express";

import { pool } from "../database/connection";

export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password, phone, cep, address } = req.body;

    const [userExists]: any = await pool.query(
      `
SELECT id
FROM users
WHERE email=?
`,
      [email],
    );

    if (userExists.length) {
      return res.status(400).json({
        message: "Email already exists",
      });
    }

    await pool.query(
      `
INSERT INTO users
(
name,
email,
password,
phone,
cep,
address
)
VALUES
(?,?,?,?,?,?,?)
`,
      [name, email, password, phone, cep, address],
    );

    res.status(201).json({
      message: "User created successfully",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Error creating user",
    });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const [users]: any = await pool.query(
      `
SELECT *
FROM users
WHERE email=?
`,
      [email],
    );

    if (!users.length) {
      return res.status(400).json({
        message: "Invalid email",
      });
    }

    const user = users[0];

    if (user.password !== password) {
      return res.status(400).json({
        message: "Invalid password",
      });
    }

    res.json({
      id: user.id,

      name: user.name,

      email: user.email,

      phone: user.phone,

      cep: user.cep,

      address: user.address,

      role: user.role,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Login error",
    });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const { name, phone, cep, address } = req.body;

    await pool.query(
      `
      UPDATE users
      SET
        name = ?,
        phone = ?,
        cep = ?,
        address = ?
      WHERE id = ?
      `,
      [name, phone, cep, address, id],
    );

    res.json({
      message: "User updated successfully",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Error updating user",
    });
  }
};
