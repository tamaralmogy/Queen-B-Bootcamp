
// // const { Pool } = require('pg');

// // const pool = new Pool({
// //   user: "postgres",
// //   host: "localhost",
// //   database: "postgres",
// //   password: "mysecretpassword",
// //   port: 5432,
// // });

// // exports.getMentors = async (req, res) => {
// //   const { search, field, workplace } = req.query; // Added field and workplace as query parameters

// //   try {
// //     // Base SQL query to get all mentors
// //     let query = `
// //       SELECT u.*, m.*
// //       FROM "users" u
// //       JOIN "mentors" m ON u.id = m.userId
// //     `;

// //     const values = [];
// //     const conditions = [];

// //     // If there's a search query, append the WHERE clause to filter by name (firstName or lastName)
// //     if (search) {
// //       conditions.push(`
// //         (LOWER(u.firstName) ILIKE $${values.length + 1} OR
// //          LOWER(u.lastName) ILIKE $${values.length + 1})
// //       `);
// //       values.push(`%${search.toLowerCase()}%`);
// //     }

// //     // Filter by field
// //     if (field) {
// //       conditions.push(`
// //         LOWER(m.field) ILIKE $${values.length + 1}
// //       `);
// //       values.push(`%${field.toLowerCase()}%`);
// //     }

// //     // Filter by workplace
// //     if (workplace) {
// //       conditions.push(`
// //         LOWER(m.workplace) ILIKE $${values.length + 1}
// //       `);
// //       values.push(`%${workplace.toLowerCase()}%`);
// //     }

// //     // If any conditions exist, append them to the query with WHERE
// //     if (conditions.length > 0) {
// //       query += " WHERE " + conditions.join(" AND ");
// //     }

// //     const result = await pool.query(query, values);

// //     if (result.rows.length === 0) {
// //       return res.status(404).json({ message: 'No mentors found' });
// //     }

// //     res.json(result.rows); // Send back the filtered mentor data
// //   } catch (error) {
// //     console.error('Error fetching mentors:', error);
// //     res.status(500).json({ error: 'Database error' });
// //   }
// // };



// const { Pool } = require('pg');

// const pool = new Pool({
//   user: "postgres",
//   host: "localhost",
//   database: "postgres",
//   password: "mysecretpassword",
//   port: 5432,
// });

// exports.getMentors = async (req, res) => {
//   const { search, field, workplace } = req.query; // Added field and workplace as query parameters

//   try {
//     // Base SQL query to get all mentors
//     let query = `
//       SELECT u.*, m.*
//       FROM "users" u
//       JOIN "mentors" m ON u.id = m.userId
//     `;

//     const values = [];
//     const conditions = [];

//     // If there's a search query, append the WHERE clause to filter by name (firstName or lastName)
//     if (search) {
//       conditions.push(`
//         (LOWER(u.firstName) ILIKE $${values.length + 1} OR
//          LOWER(u.lastName) ILIKE $${values.length + 1})
//       `);
//       values.push(`%${search.toLowerCase()}%`);
//     }

//     // Filter by field
//     if (field) {
//       conditions.push(`
//         LOWER(m.field) ILIKE $${values.length + 1}
//       `);
//       values.push(`%${field.toLowerCase()}%`);
//     }

//     // Filter by workplace
//     if (workplace) {
//       conditions.push(`
//         LOWER(m.workplace) ILIKE $${values.length + 1}
//       `);
//       values.push(`%${workplace.toLowerCase()}%`);
//     }

//     // If any conditions exist, append them to the query with WHERE
//     if (conditions.length > 0) {
//       query += " WHERE " + conditions.join(" AND ");
//     }

//     const result = await pool.query(query, values);

//     if (result.rows.length === 0) {
//       return res.status(404).json({ message: 'No mentors found' });
//     }

//     res.json(result.rows); // Send back the filtered mentor data
//   } catch (error) {
//     console.error('Error fetching mentors:', error);
//     res.status(500).json({ error: 'Database error' });
//   }
// };


const { Pool } = require('pg');

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "postgres",
  password: "mysecretpassword",
  port: 5432,
});

exports.getMentors = async (req, res) => {
  const { search, field, workplace } = req.query;  // Extract filters from query parameters

  try {
    // Base query to select mentors
    let query = `
      SELECT m.*
      FROM "mentors" m 
    `;

    const values = [];
    const conditions = [];

    // Search by name (firstName or lastName)
    if (search) {
      conditions.push(`
        (LOWER(m.fullName) ILIKE $${values.length + 1} `);
      values.push(`%${search.toLowerCase()}%`);
    }

    // Filter by field
    if (field) {
      conditions.push(`LOWER(m.field) ILIKE $${values.length + 1}`);
      values.push(`%${field.toLowerCase()}%`);
    }

    // Filter by workplace
    if (workplace) {
      conditions.push(`LOWER(m.workplace) ILIKE $${values.length + 1}`);
      values.push(`%${workplace.toLowerCase()}%`);
    }

    // Append conditions to the query
    if (conditions.length > 0) {
      query += " WHERE " + conditions.join(" AND ");
    }

    const result = await pool.query(query, values);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'No mentors found' });
    }

    res.json(result.rows);  // Send filtered results back to the client
  } catch (error) {
    console.error('Error fetching mentors:', error);
    res.status(500).json({ error: 'Database error' });
  }
};
