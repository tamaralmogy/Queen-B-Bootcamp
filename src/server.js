// server.js
const express = require("express");
const cors = require("cors");
const path = require("path");
const port = process.env.PORT || 5001;

const app = express();
const pool = require("./config");

// Import routes
const authRoutes = require("./routes/authRoutes");
const mentorRoutes = require("./routes/mentorRoutes");

// Set up CORS and JSON parsing
app.use(cors());
app.use(express.json());

// Serve static files from React build
app.use(express.static(path.join(__dirname, "../client/build")));

// Use routes
app.use("/api", authRoutes); // Handles /api/signup and /api/login
app.use("/api", mentorRoutes); // Handles /api/mentors

// Fallback route for React
app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build", "index.html"));
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
