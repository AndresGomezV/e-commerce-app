const express = require('express');
const { query } = require('../DB/db'); // import query function from DB
const ordersRoutes = express.Router();

//Routes

// GET /orders: Retrieve all orders.
ordersRoutes.get('/', async (req, res) => {

});


// GET /orders/:id: Retrieve a specific order.
ordersRoutes.get('/:id', async (req, res) => {

});


// POST /orders: Create a new order.
ordersRoutes.post('/', async (req, res) => {

});


// PUT /orders/:id: Update an existing order (e.g., change status).
ordersRoutes.put('/:id', async (req, res) => {

});

// DELETE /orders/:id: Delete an order.
ordersRoutes.delete('/:id', async (req, res) => {

});


module.exports = ordersRoutes; // Export the router