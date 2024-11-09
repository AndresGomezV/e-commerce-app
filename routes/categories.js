const express = require('express');
const { query } = require('../DB/db'); // import query function from DB
const categoriesRoutes = express.Router();

//Routes

// GET /categories: Retrieve all categories.
categoriesRoutes.get('/', async (req, res) => {

});


// GET /categories/:id: Retrieve a specific category.
categoriesRoutes.get('/:id', async (req, res) => {

});


// POST /categories: Create a new category.
categoriesRoutes.post('/', async (req, res) => {

});


// PUT /categories/:id: Update an existing category.
categoriesRoutes.post('/:id', async (req, res) => {

});


// DELETE /categories/:id: Delete a category.
categoriesRoutes.delete('/:id', async (req, res) => {

});


module.exports = categoriesRoutes; // Export the router