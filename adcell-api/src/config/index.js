const config = {
  pgUser: process.env.PGUSER,
  pgHost: process.env.PGHOST,
  pgDatabase: process.env.PGDATABASE,
  pgPassword: process.env.PGPASSWORD,
  pgPort: process.env.PGPORT
  // pgUser: 'postgres',
  // pgHost: 'postgres',
  // pgDatabase: 'postgres',
  // pgPassword: '',
  // pgPort: 5432
};

module.exports = config;