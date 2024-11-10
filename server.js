const express = require('express');
const app = express();
const port = 3000;

// Cargar variables de entorno
require('dotenv').config();

// Middlewares para manejar datos JSON y formularios
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Database
const { query } = require('./DB/db'); // Importar la función para realizar consultas
query('SELECT NOW()')
  .then(res => console.log('Database connected:', res.rows[0]))
  .catch(err => console.error('Database connection error:', err));

//CORS
const cors = require('cors');
app.use(cors()); // Allow all origins, or specify your frontend URL

//Passport
const session = require('express-session');
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require('bcryptjs');

app.use(session({
    secret: '1234', // This is used to sign the session ID cookie
    resave: false,
    saveUninitialized: true
  }));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(
    async (username, password, done) => {
      try {
        // Query to find the user by username
        const result = await query('SELECT * FROM customers WHERE username = $1', [username]);
  
        if (result.rows.length === 0) {
          return done(null, false, { message: 'Invalid username or password' });
        }
  
        const user = result.rows[0];
  
        // Check if the password is correct using bcrypt (the password in the database is already hashed with a salt)
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
          return done(null, false, { message: 'Invalid username or password' });
        }
  
        return done(null, user);
      } catch (err) {
        console.error(err);
        return done(err);
      }
    }
  ));

passport.serializeUser((user, done) => {
  done(null, user.customer_id); // Store the user ID in the session
});

passport.deserializeUser(async (id, done) => {
  try {
    const result = await query('SELECT * FROM customers WHERE customer_id = $1', [id]);
    done(null, result.rows[0]); // Store the user object in the session
  } catch (err) {
    done(err, null);
  }
});

//Auth (Deben ir despues de passport)
const authRoutes = require('./routes/auth');
app.use('/auth', authRoutes);

//Routers
const customersRoutes =  require('./routes/customers');
app.use('/customers', customersRoutes);

const productsRoutes = require('./routes/products');
app.use('/products', productsRoutes);

const ordersRoutes = require('./routes/orders');
app.use('/orders', ordersRoutes);

const orderItemsRoutes = require('./routes/orderitems');
app.use('/orderItems', orderItemsRoutes);

const paymentsRoutes = require('./routes/payments');
app.use('/payments', paymentsRoutes);

const categoriesRoutes = require('./routes/categories');
app.use('/categories', categoriesRoutes);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});

app.get('/', (req, res) => {
    res.send('Welcome to the E-commerce API!');
});
