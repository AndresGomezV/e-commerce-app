const express = require('express');
const app = express();
const { query } = require('./db'); // Importar la función para realizar consultas
const port = 3000;

// Cargar variables de entorno
require('dotenv').config();

// Middlewares para manejar datos JSON y formularios
//usamos la version express.json y express.urlencoded (en lugar de bodyparser) dado que tenemos la version mas reciente 4.21.1
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Ruta para verificar la conexión y obtener datos de clientes
app.get('/customers', async (req, res) => {
    try {
      const result = await query('SELECT * FROM customers'); // Consulta a la tabla customers
      res.json(result.rows); // Enviar los resultados como respuesta JSON
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Database query failed' });
    }
  });

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});

