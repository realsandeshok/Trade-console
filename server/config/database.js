//config/database.js
const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'Trading-console',
  password: 'root',
  port: 5432,
});

module.exports = pool;
