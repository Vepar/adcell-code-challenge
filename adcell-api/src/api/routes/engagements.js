const routes = require('express').Router();
const historicalEngagementService = require('../../services/historicalEngagementService')

routes.get('/', async (req, res) => {
  let historicalEngagements;
  try{
    historicalEngagements = await historicalEngagementService.getHistoricalEngagements();
  } catch(e) {
    res.status(500);
  }

  res.status(200).send(historicalEngagements.rows);
});

routes.get('/current', async (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  let currentEngagements;
  try{
    currentEngagements = await historicalEngagementService.getCurrentEngagements();
  } catch(e) {
    res.status(500);
  }

  res.status(200).send(currentEngagements);
});

routes.get('/historical', async (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  let historicalEngagements;
  try{
    const product = req.query.product;
    const adSource = req.query.adSource;
    historicalEngagements = await historicalEngagementService.getHistoricalByProductAndSource(product, adSource);
  } catch(e) {
    res.status(500);
  }

  res.status(200).send(historicalEngagements);
});

module.exports = routes;