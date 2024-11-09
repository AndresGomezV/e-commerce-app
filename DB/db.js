const Pool = require('pg').Pool

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'e-commerce App',
  password: 'postgres',
  port: 5432,
})

// Función para ejecutar consultas
const query = (text, params) => pool.query(text, params);

module.exports = { query };