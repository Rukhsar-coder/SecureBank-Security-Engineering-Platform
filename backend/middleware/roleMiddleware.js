const { addSecurityEvent } = require("../security/securityEvents");

const authorizeRoles = (...allowedRoles) => {
  return (req, res, next) => {
    // User role extracted from verified JWT

    const userRole = req.user.role;

    // Role authorization enforcement

    if (!allowedRoles.includes(userRole)) {
      addSecurityEvent({
        type: "RBAC_DENIED",

        severity: "high",

        user: req.user.username,

        description:
          "Unauthorized attempt to access restricted operational resource",

        endpoint: req.originalUrl,
      });

      return res.status(403).json({
        message: "Forbidden: insufficient permissions",
      });
    }

    next();
  };
};

module.exports = authorizeRoles;
