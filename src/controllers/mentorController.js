const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "postgres",
  password: "mysecretpassword",
  port: 5432,
});

exports.getMentors = async (req, res) => {
  const { search, field, workplace } = req.query; // Extract filters from query parameters

  try {
    // Base query to select mentors
    let query = `
      SELECT *
      FROM mentors
    `;

    const values = [];
    const conditions = [];

    // Search by name (fullName starts with search term or is at the start of any word)
    if (search) {
      conditions.push(`(fullName ~* $${values.length + 1})`);
      // Using regex to match at the start of any word (words separated by spaces)
      values.push(`(^|\\s)${search.toLowerCase()}`);
    }

    // Filter by field
    if (field) {
      conditions.push(`(field ~* $${values.length + 1})`);
      values.push(`(^|\\s)${field.toLowerCase()}`);
    }

    // Filter by workplace
    if (workplace) {
      conditions.push(`(workplace ~* $${values.length + 1})`);
      values.push(`(^|\\s)${workplace.toLowerCase()}`);
    }

    // Append conditions to the query
    if (conditions.length > 0) {
      query += " WHERE " + conditions.join(" AND ");
    }

    const result = await pool.query(query, values);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "No mentors found" });
    }

    res.json(result.rows); // Send filtered results back to the client
  } catch (error) {
    console.error("Error fetching mentors:", error);
    res.status(500).json({ error: "Database error" });
  }
};
