const express = require("express");
const jwt = require("jsonwebtoken");
const { loginLimiter } = require("../middleware/rateLimitMiddleware");

const router = express.Router();

// Previous implementation lacked protection against brute-force & credential stuffing attacks
// router.post("/login", (req, res) => {

// Added rate limiting middleware to reduce authentication abuse attempts
router.post("/login", loginLimiter, (req, res) => {
  const { username, password } = req.body;

  const token = jwt.sign(
    {
      username,
      // role: "admin",
      role: "customer",
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "1h",
    },
  );

  res.json({
    message: "Login successful",
    token,
  });
});

module.exports = router;
