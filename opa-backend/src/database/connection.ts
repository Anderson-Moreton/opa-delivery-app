import mysql from 'mysql2/promise';

import dotenv from 'dotenv';

dotenv.config();

export const pool = mysql.createPool({

  host: process.env.DB_HOST || 'localhost',

  port: Number(process.env.DB_PORT) || 3307,

  user: process.env.DB_USER || 'root',

  password: process.env.DB_PASSWORD || 'root',

  database: process.env.DB_NAME || 'opa_db_dev'

});