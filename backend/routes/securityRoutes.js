const express = require("express");

const router = express.Router();

const { protect } = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");
const { getSecurityEvents } = require("../security/securityEvents");

// Security telemetry endpoint

// Broken Access Control— role authorization intentionally removed.
// Any authenticated user can now access admin security telemetry.

router.get("/metrics", protect, authorizeRoles("admin"), (req, res) => {
  // router.get("/metrics", protect, (req, res) => {

  res.json({
    sqlInjectionAttempts: 14,
    failedLogins: 38,
    secureApiRequests: 98,
    activeThreats: 3,
  });
});

router.get("/events", protect, authorizeRoles("admin"), (req, res) => {
  const events = getSecurityEvents();

  res.json(events);
});

module.exports = router;
