const { v4: uuidv4 } = require("uuid");
const pool = require("../config");
const nodemailer = require("nodemailer");
const crypto = require("crypto");
const { error } = require("console");

// Forgot Password Handler
exports.forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    // Check if the user exists
    const userResult = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );
    if (userResult.rows.length === 0) {
      return res.status(400).json({ error: "Email not found" });
    }

    // Generate a unique reset token
    const resetToken = crypto.randomBytes(32).toString("hex");
    const resetLink = `http://localhost:3000/reset-password?token=${resetToken}`;

    // Send the reset password link via email
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "your-email@gmail.com",
        pass: "your-email-password",
      },
    });

    const mailOptions = {
      from: "your-email@gmail.com",
      to: email,
      subject: "Password Reset",
      text: `You can reset your password using the following link: ${resetLink}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error(error);
        return res.status(500).json({ error: "Failed to send email." });
      }
      console.log("Email sent: " + info.response);
      res.status(200).json({ message: "Password reset link sent!" });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error." });
  }
};

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
