const express = require('express');
const cors = require('cors');
const path = require('path');
const { Pool } = require('pg');
require('dotenv').config();
// const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid");
const port = process.env.PORT || 5001;

const app = express();

// Set up CORS
app.use(cors());

// Set up PostgreSQL connection
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "postgres",
  password: "mysecretpassword",
  port: 5432,
});

// Serve static files from React build
app.use(express.json());
// enables the server to serve the client app without running it
//app.use(express.static(path.join(__dirname, "../client/build")));

// Sign-Up Route
app.post("/api/signup", async (req, res) => {
  const { firstName, lastName, email, password, role } = req.body;
  console.log("Received data:", { firstName, lastName, email, password, role });

  if (!firstName || !lastName || !email || !password) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    // Generate unique user ID
    const userId = uuidv4();

    // Try connecting to database
    const connectingDB = await pool.query("SELECT * FROM users");
    ``;
    console.log("DB connected:", connectingDB);

    // Check if user already exists
    const userExists = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );
    if (userExists.rows.length > 0) {
      return res.status(400).json({ error: "User already exists" });
    }
    // const hashedPassword = await bcrypt.hash(password, 10);

    // Insert new user into database including userID
    const newUser = await pool.query(
      "INSERT INTO users (id, first_name, last_name, email, password, role) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
      [userId, firstName, lastName, email, password, role]
    );

    // Respond with the new user's data (without the password)
    res
      .status(201)
      .json({ message: "User created successfully", user: newUser.rows[0] });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

// For testing
//pp.get("/api/helloworld", (req, res) => {
  //res.send("Hello World");


// app.get("/*", (req, res) => {
//   // res.send('Anything else');
//   res.sendFile(path.join(__dirname, "../client/build", "index.html"));
// });

app.get('/api/mentors', async (req, res) => {
  const { search } = req.query; // Get the 'search' query parameter from the request
  
  try {
    // Base SQL query to get all mentors
    let query = `
      SELECT u.*, m.*
      FROM "User" u
      JOIN "Mentor" m ON u.id = m.userId
    `;

    // If there's a search query, append the WHERE clause to filter by name, field, or languages
    if (search) {
      query += `
        WHERE
          LOWER(u.firstName) ILIKE $1 OR
          LOWER(u.lastName) ILIKE $1 OR
          LOWER(m.field) ILIKE $1 OR
          LOWER(m.languages) ILIKE $1
      `;
    }

    // Use a parameterized query to prevent SQL injection
    const values = search ? [`%${search.toLowerCase()}%`] : [];
    const result = await pool.query(query, values);

    res.json(result.rows); // Send back the filtered mentor data
  } catch (error) {
    console.error('Error fetching mentors:', error.message);
    res.status(500).json({ error: 'Database error' });
  }
});


// Serve React app for all non-API routes
//app.get('/*', (req, res) => {
 // res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
//});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
