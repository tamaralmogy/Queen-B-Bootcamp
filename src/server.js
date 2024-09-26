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

// Set up CORS and JSON parsinag
app.use(cors());
app.use(express.json());

// Serve static files from React build
app.use(express.static(path.join(__dirname, "../client/build")));

// Use routes
app.use("/api", authRoutes); // Handles /api/signup and /api/login
app.use("/api/mentors", mentorRoutes); // Handles /api/mentors

// טיפול בשליחת הנתונים מהטופס
app.post("/submit", (req, res) => {
  const {
    fullName,
    field,
    phone,
    linkedin,
    github,
    programmingLanguages,
    workplace,
    avatar,
    scheduleLink,
  } = req.body;
  console.log("Request body:", req.body); // הצגת הנתונים שהתקבלו בשרת

  // שאילתה להכניס את הנתונים לטבלת users
  const query =
    "INSERT INTO mentors ( fullName, field ,phone,linkedin,github,programmingLanguages,workplace,avatar,scheduleLink) VALUES ($1, $2,$3,$4,$5,$6,$7,$8,$9) RETURNING *";
  const values = [
    fullName,
    field,
    phone,
    linkedin,
    github,
    programmingLanguages,
    workplace,
    avatar,
    scheduleLink,
  ];

  // ביצוע השאילתה למסד הנתונים
  pool.query(query, values, (err, result) => {
    if (err) {
      console.error("Error executing query", err.stack);
      return res.status(500).json({ error: "Error inserting data" });
    }
    console.log("Data inserted:", result.rows[0]);
    res
      .status(200)
      .json({ message: "Data inserted successfully", data: result.rows[0] });
  });
});

// Fallback route for React
app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build", "index.html"));
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
