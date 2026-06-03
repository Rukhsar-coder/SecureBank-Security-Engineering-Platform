const express = require("express");

const { protect } = require("../middleware/authMiddleware");
const { auditLogger } = require("../middleware/auditMiddleware");
const pool = require("../config/db");

const router = express.Router();

router.get("/", protect, auditLogger, async (req, res) => {
  const result = await pool.query(
    `
    SELECT *
    FROM public.transactions
    WHERE sender = $1
    OR receiver = $1
    ORDER BY created_at DESC
    `,
    [req.user.username],
  );

  // Ownership-Based Access Control:
  // Prevents IDOR (Insecure Direct Object Reference)
  // by ensuring users can only access transactions
  // where they are either the sender or receiver.

  const userTransactions = result.rows.map((transaction) => ({
    ...transaction,

    // Transaction Direction:
    // Added to support frontend transaction history UI.
    // Allows customers to distinguish between
    // outgoing and incoming transactions.

    direction: transaction.sender === req.user.username ? "sent" : "received",
  }));

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

router.post("/transfer", protect, auditLogger, async (req, res) => {
  try {
    const { receiver, amount, note } = req.body;

    const sender = req.user.username;

    if (!receiver || !amount) {
      return res.status(400).json({
        message: "Receiver and amount are required",
      });
    }

    const senderResult = await pool.query(
      "SELECT * FROM users WHERE username = $1",
      [sender],
    );

    const receiverResult = await pool.query(
      "SELECT * FROM users WHERE username = $1",
      [receiver],
    );

    const senderUser = senderResult.rows[0];
    const receiverUser = receiverResult.rows[0];

    if (!receiverUser) {
      return res.status(404).json({
        message: "Receiver account not found",
      });
    }

    if (Number(senderUser.balance) < Number(amount)) {
      return res.status(400).json({
        message: "Insufficient funds",
      });
    }

    await pool.query(
      "UPDATE users SET balance = balance - $1 WHERE username = $2",
      [amount, sender],
    );

    await pool.query(
      "UPDATE users SET balance = balance + $1 WHERE username = $2",
      [amount, receiver],
    );

    await pool.query(
      `
      INSERT INTO transactions
      (
        sender,
        receiver,
        amount,
        note
      )
      VALUES ($1,$2,$3,$4)
      `,
      [sender, receiver, amount, note || "Transfer"],
    );

    res.json({
      message: "Transfer completed successfully",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server error",
    });
  }
});

module.exports = router;
