# Broken Access Control (RBAC)

## Overview

This report documents a controlled Broken Access Control vulnerability scenario implemented and remediated within the SecureBank platform.

The objective was to demonstrate:

- Role-Based Access Control (RBAC)
- Authorization enforcement
- Protected administrative routes
- Security telemetry logging
- Secure remediation practices

---

# Vulnerability Description

A customer-level user attempted to access administrator-only security telemetry resources.

Affected endpoint:

```text
/api/security/events
```

Without proper authorization controls, sensitive security data could be exposed to unauthorized users.

---

# Business Impact

Improper access control may allow attackers or low-privileged users to:

- View sensitive security telemetry
- Access monitoring infrastructure
- Enumerate internal system activity
- Expose operational security data
- Increase attacker reconnaissance capabilities

This maps to:

- OWASP Top 10: Broken Access Control
- CWE-862: Missing Authorization

---

# Exploitation Scenario

## Customer User Authentication

A customer account successfully authenticated using JWT authentication.

Example payload:

```json
{
  "username": "customer_user",
  "role": "customer"
}
```

---

## Unauthorized Endpoint Access Attempt

The authenticated customer attempted to access:

```text
GET /api/security/events
```

using a valid JWT token.

---

# Expected Secure Behavior

The backend authorization middleware validates:

- JWT authenticity
- User role claims
- Route authorization permissions

Customer users should NOT access administrator-only resources.

---

# Remediation Implemented

SecureBank enforces role-based authorization using middleware validation.

Example authorization logic:

```javascript
if (req.user.role !== "admin") {
  return res.status(403).json({
    message: "Access denied",
  });
}
```

---

# Security Controls Demonstrated

| Control            | Implementation     |
| ------------------ | ------------------ |
| Authentication     | JWT                |
| Authorization      | RBAC middleware    |
| Access Enforcement | Admin-only routes  |
| Logging            | Security telemetry |
| Error Handling     | 403 Forbidden      |
| Monitoring         | Security dashboard |

---

# Validation Results

## Authorized Admin Access

Admin users successfully accessed:

```text
/api/security/events
```

Response:

```http
200 OK
```

---

## Unauthorized Customer Access

Customer users received:

```http
403 Forbidden
```

Example response:

```json
{
  "message": "Access denied"
}
```

---

# Security Telemetry

Unauthorized access attempts are logged for monitoring purposes.

Example telemetry event:

```json
{
  "type": "RBAC_DENIED",
  "severity": "high",
  "endpoint": "/api/security/events",
  "user": "customer_user"
}
```

---

# Demonstration Screenshots

Recommended screenshots:

- Customer login
- Unauthorized access attempt
- 403 Forbidden response
- Admin dashboard access
- Security Center telemetry view

---

# Lessons Learned

This demonstration highlights the importance of:

- Backend authorization enforcement
- Least privilege access
- Role validation
- Security monitoring
- Protected administrative resources

Authorization must always be validated server-side regardless of frontend restrictions.

---

# Final Status

## Vulnerability Status:

REMEDIATED

## Security Validation:

PASSED

## Risk Level After Remediation:

LOW
