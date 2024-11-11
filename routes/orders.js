const express = require("express");
const { query } = require("../DB/db"); // import query function from DB
const ordersRoutes = express.Router();

//Error handling middleware
function errorHandler(err, req, res, next) {
  console.error(err);
  res.status(500).json({ message: "Internal Server Error" });
}

//Routes

// GET /orders: Retrieve all orders from an specific customer
ordersRoutes.get("/", async (req, res, next) => {
  try {
    const customer_id = req.user.id; // Suponiendo que el ID del cliente está en req.user.id después de autenticación (con JWT)
    let queryText = "SELECT * FROM orders WHERE customer_id = $1";

    const result = await query(queryText, [customer_id]);

    if (result.rows.length === 0) {
        return res.status(404).json({ message: `No orders for customer with id: ${customer_id}`})
    }

    res.status(200).json(result.rows);
  } catch (err) {
    next(err);
  }
});

// GET /orders/:id: Retrieve a specific order.
ordersRoutes.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;

    let queryText = "SELECT * FROM orders WHERE order_id = $1";

    const result = await query(queryText, [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json(result.rows[0]);
  } catch (err) {
    next(err);
  }
});

// POST /orders: Create a new order.
ordersRoutes.post("/", async (req, res, next) => {
  const { customer_id, payment_id, order_status, items } = req.body;
  // `items` es un array de objetos con `product_id`, `items_quantity`, y `order_price` (order_items table)
  try {
    //Crear la orden en la tabla `orders`
    let queryOrderText =
      "INSERT INTO orders (customer_id, payment_id, order_status) VALUES ($1, $2, $3) RETURNING *";
    const result = await query(queryOrderText, [
      customer_id,
      payment_id,
      order_status,
    ]);
    const newOrder = result.rows[0];

    // Verificar si la orden fue creada
    if (!newOrder) {
      return res.status(500).json({ message: "Failed to create order" });
    }
    //agregar cada producto a `order_items`
    const orderItemsValues = items.map((item) => [
      newOrder.order_id, // Referencia al ID de la orden recién creada
      item.product_id,
      item.items_quantity,
      item.order_price,
    ]);

    // Inserta los productos en `order_items`
    const queryOrderItemsText = `
      INSERT INTO order_items (order_id, product_id, items_quantity, order_price)
      VALUES ($1, $2, $3, $4)
      RETURNING *`;

    const insertedItems = [];
    for (const values of orderItemsValues) {
      const result = await query(queryOrderItemsText, values);
      insertedItems.push(result.rows[0]);
    }

    res.status(201).json({
      message: "Order created successfully",
      order: newOrder,
      items: insertedItems,
    });
  } catch (err) {
    next(err);
  }
});

// PUT /orders/:id: Update an existing order (e.g., change status or items).
ordersRoutes.put("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const { order_status, items } = req.body;

    // Verificar si la orden existe
    let queryText = "SELECT * FROM orders WHERE order_id = $1";
    const orderExists = await query(queryText, [id]);

    if (orderExists.rows.length === 0) {
      return res.status(404).json({ message: "Order not found" });
    }

    // Actualizar el status de la orden
    let updatedOrder = orderExists.rows[0]; // Para almacenar la orden actualizada
    if (order_status) {
      queryText =
        "UPDATE orders SET order_status = $1 WHERE order_id = $2 RETURNING *";
      const result = await query(queryText, [order_status, id]);
      updatedOrder = result.rows[0]; // Actualizamos con la orden modificada
    }

    // Actualizar los items de la orden si `items` fue proporcionado
    if (items && items.length > 0) {
      // Primero, eliminar los items actuales para reemplazarlos
      queryText = "DELETE FROM order_items WHERE order_id = $1";
      await query(queryText, [id]);

      // Insertar los nuevos items
      const orderItemsValues = items.map((item) => [
        id, // Usamos el `id` directamente aquí
        item.product_id,
        item.items_quantity,
        item.order_price,
      ]);

      const queryOrderItemsText = `
          INSERT INTO order_items (order_id, product_id, items_quantity, order_price)
          VALUES ($1, $2, $3, $4)
          RETURNING *`;

      const insertedItems = [];
      for (const values of orderItemsValues) {
        const result = await query(queryOrderItemsText, values);
        insertedItems.push(result.rows[0]);
      }

      // Incluir los items insertados en la respuesta
      updatedOrder.items = insertedItems;
    }

    res.status(200).json({
      message: "Order updated successfully",
      order: updatedOrder, // Devolvemos la orden actualizada
    });
  } catch (err) {
    next(err);
  }
});

// DELETE /orders/:id: Delete an order.
ordersRoutes.delete("/:id", async (req, res, next) => {
  try {
  } catch (err) {
    next(err);
  }
});

ordersRoutes.use(errorHandler); // Aplicar middleware de manejo de errores

module.exports = ordersRoutes; // Export the router
