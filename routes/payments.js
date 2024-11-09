const express = require('express');
const { query } = require('../DB/db'); // import query function from DB
const paymentsRoutes = express.Router();

//Routes

// GET /payments: Retrieve all payments.
paymentsRoutes.get('/', async (req, res) => {

});


// GET /payments/:id: Retrieve a specific payment.
paymentsRoutes.get('/:id', async (req, res) => {

});


// POST /payments: Create a new payment.
paymentsRoutes.post('/', async (req, res) => {

});


// PUT /payments/:id: Update an existing payment.
paymentsRoutes.put('/:id', async (req, res) => {

});


// DELETE /payments/:id: Delete a payment.
paymentsRoutes.delete('/:id', async (req, res) => {

});


module.exports = paymentsRoutes; // Export the router