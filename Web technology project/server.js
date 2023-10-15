const express = require('express');
const mariadb = require('mariadb');
const app = express();

const pool = mariadb.createPool({
  host: 'your_database_host',
  user: 'your_database_user',
  password: 'your_database_password',
  database: 'your_database_name',
  connectionLimit: 5
});

// Handle requests to retrieve data from the database
app.get('/api/products', async (req, res) => {
  let conn;
  try {
    conn = await pool.getConnection();
    const rows = await conn.query('SELECT * FROM products');
    res.json(rows);
  } catch (err) {
    throw err;
  } finally {
    if (conn) conn.release(); // release connection back to the pool
  }
});

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
