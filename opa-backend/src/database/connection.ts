import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

export const pool = mysql.createPool({
  host: process.env.MYSQLHOST || process.env.DB_HOST || "localhost",

  port: Number(process.env.MYSQLPORT || process.env.DB_PORT || 3307),

  user: process.env.MYSQLUSER || process.env.DB_USER || "root",

  password: process.env.MYSQLPASSWORD || process.env.DB_PASSWORD || "root",

  database: process.env.MYSQLDATABASE || process.env.DB_NAME || "opa_db_dev",

  charset: "utf8mb4",

  waitForConnections: true,
  connectionLimit: 10,
});
