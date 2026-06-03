const express = require("express");

console.log("ADMIN ROUTES LOADED");
const pool = require("../config/db");

const { protect, adminOnly } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/users", protect, adminOnly, async (req, res) => {
  try {
    const result = await pool.query(`
        SELECT
          username,
          role,
          account_number,
          balance
        FROM users
        ORDER BY username
      `);

    res.json(result.rows);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server error",
    });
  }
});

module.exports = router;
