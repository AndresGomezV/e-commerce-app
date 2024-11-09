const express = require('express');
const { query } = require('../DB/db'); // import query function from DB
const customersRoutes = express.Router();

//Routes


// // Ruta para verificar la conexión y obtener datos de clientes
// customersRoutes.get('/', async (req, res) => {
//     try {
//       const result = await query('SELECT * FROM customers'); // Query the customers table
//       res.json(result.rows); // Send the results as a JSON response
//     } catch (err) {
//       console.error(err);
//       res.status(500).json({ error: 'Database query failed' });
//     }
//   });


//GET /customers: Retrieve all customers.
customersRoutes.get('/', async (req, res) => {

});


// GET /customers/:id: Retrieve a specific customer.
customersRoutes.get('/:id', async (req, res) => {

});


// POST /customers: Create a new customer.
customersRoutes.post('/', async (req, res) => {
    
});


// PUT /customers/:id: Update an existing customer.
customersRoutes.put('/:id', async (req, res) => {
    
});


// DELETE /customers/:id: Delete a customer.
customersRoutes.delete('/:id', async (req, res) => {
    
});


module.exports = customersRoutes; // Export the router