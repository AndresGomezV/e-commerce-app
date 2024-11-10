const express = require("express");
const passport = require("passport");
const bcrypt = require("bcryptjs");
const { query } = require("../DB/db"); // Adjust path as needed
const authRoutes = express.Router();

// POST /auth/register
authRoutes.post("/register", async (req, res) => {
  const { username, password, email } = req.body;

  try {
    // Check if user already exists
    const userExists = await query(
      "SELECT * FROM customers WHERE username = $1",
      [username]
    );
    if (userExists.rows.length > 0) {
      return res.status(400).json({ message: "Username already taken" });
    }

    // Hash the password with a salt
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Insert the new user into the database
    const result = await query(
      "INSERT INTO customers (username, password, email_address) VALUES ($1, $2, $3) RETURNING *",
      [username, hashedPassword, email]
    );

    res
      .status(201)
      .json({ message: "User registered successfully", user: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// POST /auth/login
authRoutes.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      // Si el usuario no es autenticado, devuelve el mensaje de error
      return res.status(401).json({ message: "Invalid username or password" });
    }
    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }
      // Autenticación exitosa, devuelve la respuesta
      return res.json({ message: "Logged in successfully ", user });
    });
  })(req, res, next);
});

// GET /auth/logout
authRoutes.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err) return res.status(500).json({ error: "Error logging out" });
    res.json({ message: "Logged out successfully" });
  });
});

module.exports = authRoutes;

/*
a successful login often includes a redirect to guide users to a specific page after they authenticate. In APIs, however, a redirect might not always be necessary or preferred, especially when working without a client-side front-end, as in your case.

Here’s why:

API-Centric Approach: Since you're building an API (and currently without a client side), the backend typically responds with a JSON message (e.g., { message: 'Logged in successfully' }). The client (like Postman or any front-end app) can then handle what to do next based on that response.

Redirects in Web APIs: Redirects are generally more common in traditional web applications with full front-end and back-end integrations. In an API, a redirect URL may be sent in the JSON response if the client application needs to know where to navigate next, but it won’t be an actual HTTP redirect.

// Login route with redirect option
router.post('/login', passport.authenticate('local', { 
  successRedirect: '/dashboard', // redirect to dashboard or any other page upon success
  failureRedirect: '/login', // redirect to login again on failure
}));
*/
