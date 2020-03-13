const routes = require('express').Router();
const adSourcesService = require('../../services/adSourcesService');

routes.get('/',  async (req, res) => {
  let adSources;
  try{
    adSources = await adSourcesService.getAllAdSources();
  } catch(e) {
    res.status(500);
  }

  res.status(200).send(adSources.rows);
});

// routes.post('/', async (req, res) => {
//   try{
//   await adSourcesService.insertAdSource();
//   } catch(e) {
//     res.status(500);
//   }

//   res.status(201).send(`Item created`);
// });

module.exports = routes;