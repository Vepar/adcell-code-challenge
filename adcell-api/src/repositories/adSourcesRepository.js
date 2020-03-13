const pgClient = require('./pgClient');
const uuid = require('uuid/v4');

const tableName = 'adSource';

const createAdSourceTable = async () => {
  // drop all tables
  await pgClient
  .query(
    `
    DROP TABLE IF EXISTS historical_engagement;
    DROP TABLE IF EXISTS adSource;
    DROP TABLE IF EXISTS product;

  `)
  .catch(err => console.log(err));

  return await pgClient
  .query(
    `
    CREATE TABLE IF NOT EXISTS ${tableName} (
      id uuid,
      name TEXT NOT NUll,
      PRIMARY KEY (id)
    );
    create unique index adSource_name on ${tableName} (name);
  `)
  .catch(err => console.log(err));

}

const getAddSources = async () => {
  return await pgClient.query(`SELECT * FROM ${tableName}`);
}

const insertAdSource = async (name) => {
  const id = uuid();
  return await pgClient
    .query(
      `INSERT INTO ${tableName} (id, name) VALUES 
    ($1, $2)`,
      [id, name]
    )
}

module.exports = {
  createAdSourceTable,
  getAddSources,
  insertAdSource
}