const { Pool } = require('pg');
const config = require('../config');

const pgClient = new Pool({
  user: config.pgUser,
  host: config.pgHost,
  database: config.pgDatabase,
  password: config.pgPassword,
  port: config.pgPort
});

pgClient.on('error', () => console.log('Lost Postgres connection'));

module.exports = pgClient;