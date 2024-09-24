
const express = require('express');
const cors = require('cors');
const path = require('path');
const { Pool } = require('pg');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5001;

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
app.use(express.static(path.join(__dirname, '../client/build')));


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
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
