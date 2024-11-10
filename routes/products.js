const express = require("express");
const { query } = require("../DB/db"); // import query function from DB
const productsRoutes = express.Router();

//Error handling middleware
function errorHandler(err, req, res, next) {
  console.error(err);
  res.status(500).json({ message: "Internal Server Error" });
}

//Routes

// GET /products: Retrieve all products.
productsRoutes.get("/", async (req, res, next) => {
  try {
    const { category, limit = 10 } = req.query; // Se obtiene el límite de la query, por defecto es 10
    let queryText = "SELECT * FROM products";
    let queryParams = []; // Se crea para almacenar el valor de category

    if (category) {
      queryText =
        "SELECT * FROM products AS p JOIN categories AS c ON p.category_id = c.category_id WHERE c.category_name = $1 LIMIT $2";
      queryParams.push(category, limit); // Añade el valor de category y limit al array queryParams
    } else {
      queryText = "SELECT * FROM products LIMIT $1";
      queryParams.push(limit); // Si no hay filtro por categoría, sólo limita por el parámetro limit
    }

    const result = await query(queryText, queryParams);
    res.status(200).json(result.rows); // Devuelve los productos encontrados
  } catch (err) {
    next(err); // Enviar el error al middleware de manejo de errores
  }
});

// GET /products/:id: Retrieve a specific product.
productsRoutes.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    let queryText = "SELECT * FROM products WHERE product_id = $1";
    const result = await query(queryText, [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(result.rows[0]);
  } catch (err) {
    next(err);
  }
});

// POST /products: Create a new product.
productsRoutes.post("/", async (req, res, next) => {
  try {
    const {
      product_name,
      product_price,
      product_description,
      product_available,
      category_id,
    } = req.body;

    let queryText =
      "INSERT INTO products (product_name, product_price, product_description, product_available, category_id) VALUES ($1, $2, $3, $4, $5) RETURNING *";

    const result = await query(queryText, [
      product_name,
      product_price,
      product_description,
      product_available,
      category_id,
    ]);

    res.status(201).json(result.rows[0]);
  } catch (err) {
    next(err);
  }
});

// PUT /products/:id: Update an existing product.
productsRoutes.put("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const {
      product_name,
      product_price,
      product_description,
      product_available,
      category_id,
    } = req.body;

    let queryText =
      "UPDATE products SET product_name = $1, product_price = $2, product_description = $3, product_available = $4, category_id = $5 WHERE product_id = $6 RETURNING *";

    const result = await query(queryText, [
      product_name,
      product_price,
      product_description,
      product_available,
      category_id,
      id,
    ]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(result.rows[0]);
  } catch (err) {
    next(err);
  }
});

// DELETE /products/:id: Delete a product.
productsRoutes.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;

    let queryText = "DELETE FROM products WHERE product_id = $1 RETURNING *";

    const result = await query(queryText, [id]);

    if (result.rowCount === 0) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({
      message: "Product successfully deleted", // Mensaje de éxito
      product: result.rows[0], // Información del producto eliminado
    });
  } catch (err) {
    next(err);
  }
});

productsRoutes.use(errorHandler); // Aplicar middleware de manejo de errores

module.exports = productsRoutes; // Export the router
