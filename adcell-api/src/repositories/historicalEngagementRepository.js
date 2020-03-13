const pgClient = require('./pgClient');
const uuid = require('uuid/v4');

const tableName = 'historical_engagement'

const createHistoricalEngagementTable = async() => {
  return await pgClient
  .query(
    `
  CREATE TABLE IF NOT EXISTS ${tableName} (
    id uuid,
    adSource TEXT NOT NUll REFERENCES adSource(name),
    product TEXT NOT NUll REFERENCES product(name),
    clicks NUMERIC NOT NULL,
    total_clicks NUMERIC NULL,
    date DATE NOT NULL,
    PRIMARY KEY (id)
  );
`
  );
}

const getAllHistoricalEngagements= async () => {
  return await pgClient.query(`SELECT * FROM ${tableName}`);
}

const getCurrentEngagements= async () => {
  return await pgClient.query(`SELECT * FROM ${tableName} WHERE date = '2019-04-05'`);
}

const insertHistoricalEngagement = async (adSource, product, clicks, date, totalClicks) => {
  const id = uuid();
  return await pgClient
    .query(
      `INSERT INTO ${tableName} (id, adSource, product, clicks, date, total_clicks) VALUES 
    ($1, $2, $3, $4, $5, $6);`,
      [id, adSource, product, clicks, date, totalClicks]
    ).catch(e => {
      console.log(`THERE WAS AN ERRROR: ${adSource}, ${product}, ${clicks}, ${totalClicks}`)
    })
}

const getByProductAndSourceDesc = async (product, source) => {
  return await pgClient.query(
    `
    SELECT * FROM ${tableName} WHERE adSource='${source}' AND product='${product}' ORDER BY date DESC
    `);
}

const getByProductAndSourceAsc = async (product, source) => {
  return await pgClient.query(
    `
    SELECT * FROM ${tableName} WHERE adSource='${source}' AND product='${product}' ORDER BY date ASC
    `);
}

const getTotalClicks = async () => {
  return await pgClient.query(
    `
    SELECT SUM(clicks) FROM ${tableName};
    `);
}


module.exports = {
  createHistoricalEngagementTable,
  getAllHistoricalEngagements,
  insertHistoricalEngagement,
  getCurrentEngagements,
  getByProductAndSourceDesc,
  getByProductAndSourceAsc
}