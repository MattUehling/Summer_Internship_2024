// pages/api/save-user.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import mysql from 'mysql2/promise';

// Create a MySQL connection pool
const pool = mysql.createPool({
  host: 'localhost', // Update with your MySQL host
  user: 'root', // Update with your MySQL user
  password: '', // Update with your MySQL password
  database: 'mydatabase', // Update with your MySQL database name
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { email, password, rememberMe, termsOfService } = req.body;

    try {
      const connection = await pool.getConnection();
      const [result] = await connection.query(
        'INSERT INTO users (email, password, remember_me, terms_of_service) VALUES (?, ?, ?, ?)',
        [email, password, rememberMe, termsOfService]
      );
      connection.release();

      res.status(200).json({ message: 'User saved successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Database error' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
