// const express = require('express');
// const cors = require('cors');
// const path = require('path');
// const app = express();
// const port = process.env.PORT || 5001;

// /*
// CORS (Cross-Origin Resource Sharing) is a browser security feature that restricts
// cross-origin HTTP requests with other servers and specifies which domains access your resources.
// We will use this Node.js package to allow cross-origin requests.
//  */
// app.use(cors());
// app.use(express.json());
// // enables the server to serve the client app without running it
// app.use(express.static(path.join(__dirname, '../client/build')));

// app.get('/api/helloworld', (req, res) => {
//   res.send('Hello World');
// });

// app.get('/*', (req, res) => {
//   // res.send('Anything else');
//   res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
// });

// app.listen(port, () => {
//   console.log(`Server running on http://localhost:${port}`);
// });




// const express = require('express');
// const cors = require('cors');
// const { Pool } = require('pg');
// require('dotenv').config();

// const app = express();
// const port = process.env.PORT || 5001;

// // Set up CORS
// app.use(cors());

// // Set up PostgreSQL connection
// const pool = new Pool({
//   user: "postgres",
//   host: "localhost",
//   database: "postgres",
//   password: "mysecretpassword",
//   port: 5432,
// });

// app.get('/', async (req, res) => {
//   try {
//     const result = await pool.query('SELECT * FROM "Mentor"');
//     res.json(result.rows);

//   } catch (error) {
//     console.error('Error fetching mentors:', error.message);
//     res.status(500).json({ error: 'Database error' });
//   }
// });

// // Start the server
// app.listen(port, () => {
//   console.log(`Server running on http://localhost:${port}`);
// });



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

// Middleware to serve static files from React build
app.use(express.static(path.join(__dirname, '../client/build')));

// API route to get mentors data

// app.get('/api/mentors', async (req, res) => {
//   try {
//     const result = await pool.query( 'SELECT * FROM "User" NATURAL JOIN "Mentor";');
//     res.json(result.rows);
//   } catch (error) {
//     console.error('Error fetching mentors:', error.message);
//     res.status(500).json({ error: 'Database error' });
//   }
// });


app.get('/api/mentors', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT *
      FROM "User" u
      JOIN "Mentor" m ON u.id = m.userId
    `);
    res.json(result.rows);
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



