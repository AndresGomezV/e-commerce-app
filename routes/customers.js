const bcrypt = require("bcryptjs");
const express = require("express");
const { query } = require("../DB/db"); // import query function from DB
const customersRoutes = express.Router();

//Error handling middleware
function errorHandler(err, req, res, next) {
  console.error(err);
  res.status(500).json({ message: "Internal Server Error" });
}

//Routes

//GET /customers: Retrieve all customers.
customersRoutes.get("/", async (req, res) => {
  try {
    let queryText = "SELECT * FROM customers";

    const result = await query(queryText);

    res.status(200).json(result.rows);

  } catch (err) {
    next(err);
  }
});

// GET /customers/:id: Retrieve a specific customer.
customersRoutes.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    let queryText = "SELECT * FROM customers WHERE customer_id = $1";

    const result = await query(queryText, [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(result.rows[0]);

  } catch (err) {
    next(err);
  }
});

// POST /customers: Create a new customer.
customersRoutes.post("/", async (req, res, next) => {
    try {
      const { first_name, last_name, email_address, phone_number, shipping_address, password, username } = req.body;
  
      // Hash de la contraseña
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Verificar si el correo electrónico ya está registrado
      let queryText = "SELECT * FROM customers WHERE email_address = $1";
      const emailExists = await query(queryText, [email_address]);
  
      if (emailExists.rows.length > 0) {
        return res.status(409).json({ message: 'Email address is already in use' });
      }
  
      // Insertar el nuevo cliente en la base de datos
      queryText = 'INSERT INTO customers (first_name, last_name, email_address, phone_number, shipping_address, password, username) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *';
      const result = await query(queryText, [first_name, last_name, email_address, phone_number, shipping_address, hashedPassword, username]);
  
      // Devolver el cliente creado
      res.status(201).json(result.rows[0]);
  
    } catch (err) {
      next(err); // Pasar el error al middleware de manejo de errores
    }
  });
  

// PUT /customers/:id: Update an existing customer.
customersRoutes.put("/:id", async (req, res) => {
  try {
  } catch (err) {
    next(err);
  }
});

// DELETE /customers/:id: Delete a customer.
customersRoutes.delete("/:id", async (req, res) => {
  try {
  } catch (err) {
    next(err);
  }
});

customersRoutes.use(errorHandler); // Aplicar middleware de manejo de errores

module.exports = customersRoutes; // Export the router
