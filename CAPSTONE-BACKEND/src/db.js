// src/db.js
const { Pool } = require('pg');

const pool = new Pool({
  host: 'postgres.railway.internal',
  port: 5432,
  user: 'postgres',
  password: 'cwRvXKamigJLbDkVxMrMUHhWlQAQxpnU',
  database: 'railway',
});

module.exports = pool;

