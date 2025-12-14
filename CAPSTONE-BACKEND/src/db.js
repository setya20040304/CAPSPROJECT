const { Pool } = require('pg');
require('dotenv').config(); // Pastikan install dotenv jika belum

const pool = new Pool({
  connectionString: process.env.DATABASE_URL, 
  ssl: {
    rejectUnauthorized: false, // Penting untuk koneksi SSL di Railway
  },
});

module.exports = pool;
