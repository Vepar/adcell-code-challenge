const csv = require('csv-parser');
const fs = require('fs');
const { createAdSourceTable } = require('../repositories/adSourcesRepository');
const { createProductTable } = require('../repositories/productsRepository');
const { processAdSourceRow } = require('../services/adSourcesService');
const { processProductRow } = require('../services/productsService');
const { createHistoricalEngagementTable } = require('../repositories/historicalEngagementRepository');
const { 
  processAmazonRow,
  processFacebookRow,
  processGoogleRow,
  processLinkedInRow,
  processTwitterRow
 } = require('../services/historicalEngagementService');

const { parseCsv } = require('../helpers/csv-helper');

const initializeDatabase = async () => {
  await createDatabaseTables();
  await populateInitialData();
}

const populateInitialData = async () => {
  console.log('POPSTART');
  
  await parseCsv(`${__dirname}/initialData/Product_List.csv`, processProductRow); 
  await parseCsv(`${__dirname}/initialData/Advertiser_Sources.csv`, processAdSourceRow);

  // process amazon data
    await parseCsv(`${__dirname}/initialData/Amazon_04_01_2019.csv`, processAmazonRow);
    await parseCsv(`${__dirname}/initialData/Amazon_04_02_2019.csv`, processAmazonRow);
    await parseCsv(`${__dirname}/initialData/Amazon_04_03_2019.csv`, processAmazonRow);
    await parseCsv(`${__dirname}/initialData/Amazon_04_04_2019.csv`, processAmazonRow);
    await parseCsv(`${__dirname}/initialData/Amazon_04_05_2019.csv`, processAmazonRow);
  
    // process facebook data
    await parseCsv(`${__dirname}/initialData/Facebook_04_01_2019.csv`, processFacebookRow);
    await parseCsv(`${__dirname}/initialData/Facebook_04_02_2019.csv`, processFacebookRow);
    await parseCsv(`${__dirname}/initialData/Facebook_04_03_2019.csv`, processFacebookRow);
    await parseCsv(`${__dirname}/initialData/Facebook_04_04_2019.csv`, processFacebookRow);
    await parseCsv(`${__dirname}/initialData/Facebook_04_05_2019.csv`, processFacebookRow);
  
    // process google data
    await parseCsv(`${__dirname}/initialData/Google_04_01_2019.csv`, processGoogleRow);
    await parseCsv(`${__dirname}/initialData/Google_04_02_2019.csv`, processGoogleRow);
    await parseCsv(`${__dirname}/initialData/Google_04_03_2019.csv`, processGoogleRow);
    await parseCsv(`${__dirname}/initialData/Google_04_04_2019.csv`, processGoogleRow);
    await parseCsv(`${__dirname}/initialData/Google_04_05_2019.csv`, processGoogleRow);
  
    // process linkedin data
    await parseCsv(`${__dirname}/initialData/LinkedIn_04_01_2019.csv`, processLinkedInRow);
    await parseCsv(`${__dirname}/initialData/LinkedIn_04_02_2019.csv`, processLinkedInRow);
    await parseCsv(`${__dirname}/initialData/LinkedIn_04_03_2019.csv`, processLinkedInRow);
    await parseCsv(`${__dirname}/initialData/LinkedIn_04_04_2019.csv`, processLinkedInRow);
    await parseCsv(`${__dirname}/initialData/LinkedIn_04_05_2019.csv`, processLinkedInRow);
  
    // process twitter data
    await parseCsv(`${__dirname}/initialData/Twitter_04_01_2019.csv`, processTwitterRow);
    await parseCsv(`${__dirname}/initialData/Twitter_04_02_2019.csv`, processTwitterRow);
    await parseCsv(`${__dirname}/initialData/Twitter_04_03_2019.csv`, processTwitterRow);
    await parseCsv(`${__dirname}/initialData/Twitter_04_04_2019.csv`, processTwitterRow);
    await parseCsv(`${__dirname}/initialData/Twitter_04_05_2019.csv`, processTwitterRow);
}

const createDatabaseTables = async () => {
  console.log('CREATESTART');
  await createAdSourceTable();
  await createProductTable();
  await createHistoricalEngagementTable();
  console.log('CREATEEND');
  return;
}

module.exports = initializeDatabase