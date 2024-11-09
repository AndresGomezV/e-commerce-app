const express = require('express');
const { query } = require('../DB/db'); // import query function from DB
const orderItemsRoutes = express.Router();

//Routes

// GET /orders/:orderId/items: Retrieve all items in an order.
orderItemsRoutes.get('/:orderId/items', async (req, res) => {

});


// GET /orders/:orderId/items/:itemId: Retrieve a specific item in an order.
orderItemsRoutes.get('/:orderId/items/:itemId', async (req, res) => {

});


// POST /orders/:orderId/items: Add a new item to an order.
orderItemsRoutes.post('/:orderId/items', async (req, res) => {

});


// PUT /orders/:orderId/items/:itemId: Update an item in an order.
orderItemsRoutes.put('/:orderId/items/:itemId', async (req, res) => {

});


// DELETE /orders/:orderId/items/:itemId: Delete an item from an order.
orderItemsRoutes.delete('/:orderId/items/:itemId', async (req, res) => {

});



module.exports = orderItemsRoutes; // Export the router