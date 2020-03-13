const routes = require('express').Router();
const productsService = require('../../services/productsService')

routes.get('/', async (req, res) => {
  let products;
  try{
    products = await productsService.getAllProducts();
  } catch(e) {
    res.status(500);
  }

  res.status(200).send(products.rows);
});

module.exports = routes;