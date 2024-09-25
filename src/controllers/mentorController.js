// controllers/mentorController.js
const pool = require("../config");

// Mentor search controller
exports.getMentors = async (req, res) => {
  const { search } = req.query;

  try {
    let query = `
      SELECT u.*, m.*
      FROM "User" u
      JOIN "Mentor" m ON u.id = m.userId
    `;

    if (search) {
      query += `
        WHERE
          LOWER(u.firstName) ILIKE $1 OR
          LOWER(u.lastName) ILIKE $1 OR
          LOWER(m.field) ILIKE $1 OR
          LOWER(m.languages) ILIKE $1
      `;
    }

    const values = search ? [`%${search.toLowerCase()}%`] : [];
    const result = await pool.query(query, values);

    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching mentors:", error.message);
    res.status(500).json({ error: "Database error" });
  }
};
