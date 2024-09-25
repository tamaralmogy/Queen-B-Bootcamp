
const express = require("express");
const cors = require("cors");
const path = require("path");
const authRoutes = require('./routes/authRoutes');
const mentorRoutes = require('./routes/mentorRoutes');
const { Pool } = require("pg");
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "postgres",
  password: "mysecretpassword",
  port: 5432,
});

const port = process.env.PORT || 5001;
const app = express();

app.use(cors());
app.use(express.json());

// app.get("/api/test-db", async (req, res) => {
//   try {
//     const result = await pool.query("SELECT * from Mentor;"); // Simple query to check connection
//     res.status(200).json({ message: "Database connection successful", time: result.rows[0] });
//   } catch (error) {
//     console.error("Database connection error:", error); // Log detailed error
//     res.status(500).json({ error: "Database connection failed" });
//   }
// });

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/mentors', mentorRoutes);


// Serve static files from React's build folder
app.use(express.static(path.join(__dirname, '../client/build')));

// Catch-all route to serve the React app for any routes not handled by API
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
