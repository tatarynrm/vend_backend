const { Pool, Client } = require('pg');

const db = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT, // default PostgreSQL port
  });


  module.exports = db;