const historicalEngagementsRepository = require('../repositories/historicalEngagementRepository');
const { groupBy, sortBy } = require('lodash');

const getHistoricalEngagements = async () => {
  return await historicalEngagementsRepository.getAllHistoricalEngagements();
}

const getCurrentEngagements = async () => {
  const currentEngagements = await historicalEngagementsRepository.getCurrentEngagements();
  const currentSourceEngagements = groupBy(currentEngagements.rows, 'adsource');
  const currentSourceProductData = Object.keys(currentSourceEngagements).map(key => {
    const currentProductEngagements = currentSourceEngagements[key];
    const sortedProducts = sortBy(currentProductEngagements, ['product']);
    return {
      sourceName: key,
      data: sortedProducts.map(prodData => {
        return prodData.total_clicks
      })
    }
  });

  return currentSourceProductData;
}

const getHistoricalByProductAndSource = async (product, adSource) => {
  const productSourceEngagements = await historicalEngagementsRepository.getByProductAndSourceAsc(product, adSource);
  return productSourceEngagements.rows;
}

const processHistEngagementRow = async (row, date, totalClicks, adSource) => {
  const { product, clicks} = row;
  return await historicalEngagementsRepository.insertHistoricalEngagement(adSource, product, clicks, date, totalClicks)
}

const processAmazonRow = async (row, date) => {
  const newTotalClicks = await computeNewTotalClicks('Amazon', row);
  await processHistEngagementRow(row, date, newTotalClicks, 'Amazon');
}

const processFacebookRow = async (row, date) => {
  const newTotalClicks = await computeNewTotalClicks('Facebook', row);
  await processHistEngagementRow(row, date, newTotalClicks, 'Facebook');
}

const processGoogleRow = async (row, date) => {
  const newTotalClicks = await computeNewTotalClicks('Google', row);
  await processHistEngagementRow(row, date, newTotalClicks, 'Google');
}

const processLinkedInRow = async (row, date) => {
  const newTotalClicks = await computeNewTotalClicks('LinkedIn', row);
  await processHistEngagementRow(row, date, newTotalClicks, 'LinkedIn');
}

const processTwitterRow = async (row, date) => {
  // compute new total clicks
  const newTotalClicks =  await computeNewTotalClicks('Twitter', row);
  await processHistEngagementRow(row, date, newTotalClicks, 'Twitter');
}

const computeNewTotalClicks = async (source, row) => {
  const historicalRecords = await historicalEngagementsRepository.getByProductAndSourceDesc(row.product, source);
  let newTotalClicks = 0

  //get most recent record for product/source and add the new click amount
  if(historicalRecords.rows && historicalRecords.rows.length) {
    newTotalClicks = parseInt(historicalRecords.rows[0].total_clicks) + parseInt(row.clicks);
  } else {
    newTotalClicks = parseInt(row.clicks);
  }

  return newTotalClicks;
}

module.exports = { 
  getHistoricalEngagements,
  processAmazonRow,
  processFacebookRow,
  processGoogleRow,
  processLinkedInRow,
  processTwitterRow,
  getCurrentEngagements,
  getHistoricalByProductAndSource
}