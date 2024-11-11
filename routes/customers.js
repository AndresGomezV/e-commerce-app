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
customersRoutes.get("/", async (req, res, next) => {
  try {
    let queryText = "SELECT * FROM customers";

    const result = await query(queryText);

    res.status(200).json(result.rows);
  } catch (err) {
    next(err);
  }
});

// GET /customers/:id: Retrieve a specific customer.
customersRoutes.get("/:id", async (req, res, next) => {
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
    const {
      first_name,
      last_name,
      email_address,
      phone_number,
      shipping_address,
      password,
      username,
    } = req.body;

    // Hash de la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Verificar si el correo electrónico ya está registrado
    let queryText = "SELECT * FROM customers WHERE email_address = $1";
    const emailExists = await query(queryText, [email_address]);

    if (emailExists.rows.length > 0) {
      return res
        .status(409)
        .json({ message: "Email address is already in use" });
    }

    // Insertar el nuevo cliente en la base de datos
    queryText =
      "INSERT INTO customers (first_name, last_name, email_address, phone_number, shipping_address, password, username) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *";
    const result = await query(queryText, [
      first_name,
      last_name,
      email_address,
      phone_number,
      shipping_address,
      hashedPassword,
      username,
    ]);

    // Devolver el cliente creado
    res.status(201).json(result.rows[0]);
  } catch (err) {
    next(err); // Pasar el error al middleware de manejo de errores
  }
});

// PUT /customers/:id: Update an existing customer.
customersRoutes.put("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const {
      first_name,
      last_name,
      email_address,
      phone_number,
      shipping_address,
      password,
      username,
    } = req.body;

    // Verificar si el cliente existe
    let queryText = "SELECT * FROM customers WHERE customer_id = $1";
    const customerExists = await query(queryText, [id]);

    if (customerExists.rows.length === 0) {
      return res.status(404).json({ message: "Customer not found" }); // Si no existe el cliente, respondemos con un 404
    }

    // Si la contraseña es proporcionada, la actualizamos (asegurándonos de hashearla)
    let hashedPassword = undefined;
    if (password) {
      hashedPassword = await bcrypt.hash(password, 10);
    } else {
      hashedPassword = customerExists.rows[0].password; // Si no se pasa una nueva contraseña, dejamos la anterior
    }

    queryText = `UPDATE customers SET 
      first_name = $1, 
      last_name = $2, 
      email_address = $3, 
      phone_number = $4, 
      shipping_address = $5, 
      password = $6, 
      username = $7 
      WHERE customer_id = $8 
      RETURNING *`;

    const result = await query(queryText, [
      first_name || customerExists.rows[0].first_name, // Si no se pasa un valor, se mantiene el original
      last_name || customerExists.rows[0].last_name,
      email_address || customerExists.rows[0].email_address,
      phone_number || customerExists.rows[0].phone_number,
      shipping_address || customerExists.rows[0].shipping_address,
      hashedPassword,
      username || customerExists.rows[0].username,
      id,
    ]);

    res.status(200).json(result.rows[0]);
  } catch (err) {
    next(err);
  }
});

// DELETE /customers/:id: Delete a customer.
customersRoutes.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    let queryText = 'DELETE FROM customers WHERE customer_id = $1 RETURNING *';

    const result = await query(queryText, [id]);

    if (result.rowCount === 0) {
        return res.status(404).json({ message: "Customer not found" });
    }

    res.status(200).json({ message: 'Customer successfully deleted',
        customer: result.rows[0]
    });

  } catch (err) {
    next(err);
  }
});

customersRoutes.use(errorHandler); // Aplicar middleware de manejo de errores

module.exports = customersRoutes; // Export the router
