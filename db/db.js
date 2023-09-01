const { Pool, Client } = require('pg');

const db = new Pool({
    user: 'postgres',
    host: '185.25.117.64',
    database: 'vendmarket_db',
    password: 'noris',
    port: 5432, // default PostgreSQL port
  });


  module.exports = db;