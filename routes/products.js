const express = require('express');
const { query } = require('../DB/db'); // import query function from DB
const productsRoutes = express.Router();

//Routes

// GET /products: Retrieve all products.
productsRoutes.get('/', async (req, res) => {

});


// GET /products/:id: Retrieve a specific product.
productsRoutes.get('/', async (req, res) => {

});


// POST /products: Create a new product.
productsRoutes.post('/', async (req, res) => {

});


// PUT /products/:id: Update an existing product.
productsRoutes.put('/:id', async (req, res) => {

});


// // DELETE /products/:id: Delete a product.
productsRoutes.delete('/:id', async (req, res) => {

});



module.exports = productsRoutes; // Export the router