const { v4: uuidv4 } = require("uuid");
const pool = require("../config");

// Sign-up controller
exports.signup = async (req, res) => {
  const { firstName, lastName, email, password, role } = req.body;
  console.log("Received data:", { firstName, lastName, email, password, role });

  if (!firstName || !lastName || !email || !password) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const userId = uuidv4();
    const userExists = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );
    if (userExists.rows.length > 0) {
      return res.status(400).json({ error: "User already exists" });
    }

    const newUser = await pool.query(
      "INSERT INTO users (id, first_name, last_name, email, password, role) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
      [userId, firstName, lastName, email, password, role]
    );

    res
      .status(201)
      .json({ message: "User created successfully", user: newUser.rows[0] });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

// Login controller
exports.login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  try {
    const userResult = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );
    if (userResult.rows.length === 0) {
      return res.status(400).json({ error: "Email or password incorrect" });
    }

    const user = userResult.rows[0];

    if (user.password !== password) {
      return res.status(400).json({ error: "Password incorrect" });
    }

    res.status(200).json({ message: "Login successful", user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};
