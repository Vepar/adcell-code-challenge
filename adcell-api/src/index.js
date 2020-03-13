require('dotenv').config();
// Express App Setup
const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const cors = require('cors');
// const uuid = require('uuid/v4');
const initializeDatabase = require('./services/databaseInitService');
const routes = require('./api');

// Config
// const config = require('./config');

// Initialization
const app = express();
app.use(cors());
app.use(bodyParser.json());


initializeDatabase();

app.use('/', routes);

// Express route handlers
// app.get('/test', (req, res) => {
//   res.send('Working!');
// });

// // Get all to do list items
// app.get('/v1/items', async (req, res) => {
//   const items = await pgClient.query('SELECT * FROM items');
//   res.status(200).send(items.rows);
// });

// // Get a single todo item
// app.get('/v1/items', async (req, res) => {
// //   const id = req.params.id;
// // const items = await pgClient
// //     .query('SELECT * FROM items WHERE id = $1', [id])
// //     .catch(e => {
// //       res
// //         .status(500)
// //         .send(`Encountered an internal error when fetching item with ID ${id}`);
// //     });
// res.status(200).send(items.rows);
// });

// // Create a todo item
// app.post('/v1/items', async (req, res) => {
//   // const { item_name } = req.body;
//   const id = uuid();
//   // const item = await pgClient
//   //   .query(
//   //     `INSERT INTO items (id, item_name, complete) VALUES 
//   //   ($1, $2, $3)`,
//   //     [id, item_name, false]
//   //   )
//   //   .catch(e => {
//   //     res
//   //       .status(500)
//   //       .send('Encountered an internal error when creating an item');
//   //   });
//   await pgClient
//     .query(
//       `INSERT INTO items (id, item_name, complete) VALUES 
//     ($1, $2, $3)`,
//       [id, 'item1', true]
//     )
//     .catch(e => {
//       res
//         .status(500)
//         .send(`Encountered an internal error when creating an item: ${e}`);
//     });
// res.status(201).send(`Item created with ID: ${id}`);
// });

// // Update a todo item
// app.put('/v1/items/:id', async (req, res) => {
// //   const id = req.params.id;
// //   const { item_name, complete } = req.body;
// // await pgClient
// //     .query(
// //       `
// //     UPDATE items SET item_name = $1, complete = $2 WHERE id = $3
// //   `,
// //       [item_name, complete, id]
// //     )
// //     .catch(e => {
// //       res
// //         .status(500)
// //         .send('Encountered an internal error when updating an item');
// //     });
// // res.status(200).send(`Item updated with ID: ${id}`);
// res.status(200);
// });

// // Delete a todo item
// app.delete('/v1/items/:id', async (req, res) => {
// //   const id = req.params.id;
// // await pgClient.query('DELETE FROM items WHERE id = $1', [id]).catch(e => {
// //     res.status(500).send('Encountered an internal error when deleting an item');
// //   });
// // res.status(200).send(`Item deleted with ID: ${id}`);
// res.status(200)
// });

// Server
const port = process.env.PORT || 3001;
const server = http.createServer(app);
server.listen(port, () => console.log(`Server running on port ${port}`));