import express from 'express';
import cors from 'cors';

import { pool } from './database/connection';

const app = express();

app.use(cors());

app.use(express.json());

app.get('/', async (req, res) => {

  try {

    const connection =
      await pool.getConnection();

    console.log('MySQL connected 🚀');

    connection.release();

    res.send('OPA Backend + MySQL 🚀');

  } catch (error) {

    console.log(error);

    res.status(500).send('Database connection error');

  }

});

const PORT = 3000;

app.listen(PORT, () => {

  console.log(
    `Server running on port ${PORT}`
  );

});