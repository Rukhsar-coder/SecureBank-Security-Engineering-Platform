require("dotenv").config();
const cors = require("cors");

const express = require("express");
const userRoutes = require("./routes/userRoutes");
const transactionRoutes = require("./routes/transactionRoutes");
const authRoutes = require("./routes/authRoutes");
const uploadRoutes = require("./routes/uploadRoutes");
const { errorHandler } = require("./middleware/errorMiddleware");
const securityRoutes = require("./routes/securityRoutes");

const pool = require("./config/db");

const app = express();
app.use(cors());

pool
  .connect()
  .then(() => {
    console.log("Connected to PostgreSQL");
  })
  .catch((err) => {
    console.error("Database connection error:", err.message);
  });

app.use(express.json());

const PORT = 3000;

app.get("/", (req, res) => {
  res.send("SecureBank backend is running!");
});

app.post("/api/transfer", (req, res) => {
  const { sender, receiver, amount } = req.body;

  res.json({
    message: "Transfer successful",
    transaction: {
      sender,
      receiver,
      amount,
    },
  });
});

app.use("/api/users", userRoutes);
app.use("/api/transactions", transactionRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/security", securityRoutes);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
