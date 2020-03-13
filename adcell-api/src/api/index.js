const routes = require('express').Router();
const adSources = require('./routes/adSources');
const products = require('./routes/products');
const engagements = require('./routes/engagements');

routes.use('/adSources', adSources);
routes.use('/products', products);
routes.use('/engagements', engagements);

module.exports = routes;