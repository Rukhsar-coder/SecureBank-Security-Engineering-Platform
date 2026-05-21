const express = require("express");

const { protect } = require("../middleware/authMiddleware");
const { auditLogger } = require("../middleware/auditMiddleware");
const pool = require("../config/db");

const router = express.Router();

router.get("/", protect, auditLogger, async (req, res) => {
  const result = await pool.query(
    "SELECT * FROM public.transactions ORDER BY created_at DESC",
  );

  // Ownership-Based Access Control:
  // Prevents IDOR (Insecure Direct Object Reference)
  // by ensuring users can only access their own transactions.

  const userTransactions = result.rows.filter(
    (transaction) => transaction.sender === req.user.username,
  );

  res.json(userTransactions);
});

// Previously vulnerable to IDOR(Insecure Direct Object Reference) due to missing ownership validation
// router.get("/:id", (req, res) => {
// ownership validation & Audit Logging
router.get("/:id", protect, auditLogger, async (req, res) => {
  const result = await pool.query(
    "SELECT * FROM public.transactions WHERE id = $1",
    [req.params.id],
  );

  const transaction = result.rows[0];

  if (!transaction) {
    return res.status(404).json({
      message: "Transaction not found",
    });
  }

  // Ownership Validation

  // Controlled Vulnerability Simulation:
  // IDOR introduced by removing ownership validation.
  // Any authenticated user can now access arbitrary transaction IDs.

  if (transaction.sender !== req.user.username) {
    return res.status(403).json({
      message: "Access denied",
    });
  }

  res.json(transaction);
});

router.get("/search/:query", (req, res) => {
  const query = req.params.query;

  // Secure implementation using parameterized query simulation
  const simulatedSQLQuery =
    // "SELECT * FROM transactions WHERE note = '" + query + "'";
    "SELECT * FROM transactions WHERE note = ?";

  const parameters = [query];

  // Secure implementation using parameterized query simulation
  // res.json({
  //   message: "Simulated vulnerable SQL query",
  //   sql: simulatedSQLQuery,
  // });

  res.json({
    message: "Simulated secure parameterized query",
    sql: simulatedSQLQuery,
    parameters,
  });
});

module.exports = router;
