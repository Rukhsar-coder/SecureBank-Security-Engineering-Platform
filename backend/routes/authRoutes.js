const express = require("express");
const jwt = require("jsonwebtoken");
const { loginLimiter } = require("../middleware/rateLimitMiddleware");
const pool = require("../config/db");
const router = express.Router();

// Previous implementation lacked protection against brute-force & credential stuffing attacks
// router.post("/login", (req, res) => {

// Added rate limiting middleware to reduce authentication abuse attempts
router.post("/login", loginLimiter, async (req, res) => {
  try {
    const { username, password } = req.body;

    const result = await pool.query("SELECT * FROM users WHERE username = $1", [
      username,
    ]);

    const user = result.rows[0];

    if (!user) {
      return res.status(401).json({
        message: "Invalid username or password",
      });
    }

    if (user.password !== password) {
      return res.status(401).json({
        message: "Invalid username or password",
      });
    }

    const token = jwt.sign(
      {
        username: user.username,
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      },
    );

    res.json({
      message: "Login successful",
      username: user.username,
      role: user.role,
      accountNumber: user.account_number,
      balance: user.balance,
      token,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server error",
    });
  }
});

router.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        message: "Username and password are required",
      });
    }

    const existingUser = await pool.query(
      "SELECT * FROM users WHERE username = $1",
      [username],
    );

    if (existingUser.rows.length > 0) {
      return res.status(409).json({
        message: "Username already exists",
      });
    }

    const accountResult = await pool.query(`
      SELECT account_number
      FROM users
      WHERE account_number LIKE 'SB-%'
      ORDER BY account_number DESC
      LIMIT 1
    `);

    let nextAccountNumber = "SB-100003";

    if (
      accountResult.rows.length > 0 &&
      accountResult.rows[0].account_number !== "SB-ADMIN"
    ) {
      const lastNumber = parseInt(
        accountResult.rows[0].account_number.replace("SB-", ""),
      );

      nextAccountNumber = `SB-${lastNumber + 1}`;
    }

    const result = await pool.query(
      `
      INSERT INTO users
      (
        username,
        password,
        role,
        account_number,
        balance
      )
      VALUES ($1,$2,$3,$4,$5)
      RETURNING *
      `,
      [username, password, "customer", nextAccountNumber, 0],
    );

    res.status(201).json({
      message: "Customer account created successfully",
      username: result.rows[0].username,
      role: result.rows[0].role,
      accountNumber: result.rows[0].account_number,
      balance: result.rows[0].balance,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server error",
    });
  }
});

module.exports = router;
