const pgClient = require('./pgClient');
const uuid = require('uuid/v4');

const tableName = 'product';

const createProductTable = async () => {
  return await pgClient
  .query(
    `
  CREATE TABLE IF NOT EXISTS ${tableName} (
    id uuid,
    name TEXT NOT NUll,
    PRIMARY KEY (id)
  );
  create unique index product_name on ${tableName} (name);
`
  )
  .catch(err => console.log(err));
}

const getAllProducts= async () => {
  return await pgClient.query(`SELECT * FROM ${tableName}`);
}

const insertProduct = async (name) => {
  const id = uuid();
  return await pgClient
    .query(
      `INSERT INTO ${tableName} (id, name) VALUES 
    ($1, $2)`,
      [id, name]
    )
}

const getProductByName = async (name) => {
  return await pgClient.query(`SELECT * FROM ${tableName} WHERE name='${name}'`);
}

module.exports = {
  createProductTable,
  getAllProducts,
  insertProduct,
  getProductByName
}