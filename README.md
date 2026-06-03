# SecureBank

SecureBank is a full-stack security engineering platform built to demonstrate modern application security, SOC monitoring, and DevSecOps workflows.

The project simulates realistic security scenarios where vulnerabilities are intentionally introduced, exploited, remediated, monitored, and later validated through automated security testing and CI/CD pipelines.

---

# Project Overview

SecureBank focuses on the complete security lifecycle:

```text
Build → Exploit → Detect → Remediate → Monitor → Automate
```

The platform combines:

- Application Security (AppSec)
- Security Operations (SOC)
- DevSecOps
- Secure API Engineering
- CI/CD Security Automation

---

# Core Features

| Feature                          | Status      |
| -------------------------------- | ----------- |
| JWT Authentication               | Implemented |
| Role-Based Access Control (RBAC) | Implemented |
| Protected API Routes             | Implemented |
| IDOR Prevention                  | Implemented |
| Secure File Upload Validation    | Implemented |
| Security Event Monitoring        | Implemented |
| SOC Telemetry Dashboard          | Implemented |
| Audit Logging                    | Implemented |
| User Management                  | Implemented |
| Customer Dashboard               | Implemented |
| Admin Dashboard                  | Implemented |
| Profile Management               | Implemented |
| Transaction Monitoring           | Implemented |
| Jest Security Testing            | Implemented |
| GitHub Actions CI/CD             | Implemented |
| Dockerized Infrastructure        | Implemented |

---

# Architecture Overview

![Architecture Diagram](docs/screenshots/ui/architecture-diagram-v2.png)

SecureBank follows a modular security-focused architecture designed around separation of concerns, protected APIs, telemetry collection, and operational monitoring.

## Architecture Components

## Platform Access Model

SecureBank implements Role-Based Access Control (RBAC) across the application.

### Administrator Access

- Dashboard
- Profile
- Security Center
- Transactions
- Audit Logs
- User Management

### Customer Access

- Dashboard
- Profile
- Transactions

Administrative security telemetry and management functionality remain restricted to authorized administrator accounts.

### Frontend

- React
- Vite
- Tailwind CSS
- Axios
- React Router

### Backend

- Node.js
- Express.js
- JWT Authentication
- RBAC Middleware
- PostgreSQL
- Multer Upload Validation

### Security Operations

- Security telemetry collection
- Audit event logging
- Threat monitoring
- Operational dashboards

### Infrastructure

- Docker
- Docker Compose
- GitHub Actions
- CI/CD automation

---

# Application Preview

## Login Page

Secure authentication portal protected by JWT authentication and role-based access controls.

![Login Page](docs/screenshots/ui/login.png)

---

## Admin Dashboard

The administrator dashboard provides security telemetry, operational monitoring, transaction visibility, and threat intelligence metrics.

![Admin Dashboard](docs/screenshots/ui/admin-dashboard.png)

### Highlights

- Security score monitoring
- Active threat tracking
- Security event visibility
- Audit event monitoring
- System status monitoring
- Transaction overview
- Security telemetry dashboard

---

## Customer Dashboard

Customer users receive a restricted dashboard experience with access limited to their account information and transaction history.

![Customer Dashboard](docs/screenshots/ui/customer-dashboard.png)

### Highlights

- Account overview
- Personal balance information
- Recent transaction activity
- Security status visibility
- RBAC-protected user experience

---

## Profile Page

Authenticated users can review account information and assigned privileges.

![Profile Page](docs/screenshots/ui/profile-page.png)

### Highlights

- Account metadata
- Role visibility
- Security privilege level
- Account status information

---

## Security Operations Center

SOC-style operational monitoring and threat visibility.

![Security Center](docs/screenshots/ui/security-center.png)

### Highlights

- SQL injection monitoring
- Failed authentication tracking
- Security event feed
- Threat telemetry
- API security monitoring
- Threat activity dashboards

---

## Transactions

Secure transaction management and transaction monitoring.

![Transactions](docs/screenshots/ui/transactions-page.png)

### Highlights

- Fund transfer workflow
- Transaction monitoring
- Account activity visibility
- Secure transaction operations

---

## Audit Logs

Enterprise security event monitoring and audit visibility.

![Audit Logs](docs/screenshots/ui/audit-logs.png)

### Highlights

- Authentication auditing
- Security event tracking
- Operational logging
- Incident visibility

---

## User Management

Administrative interface for managing customer accounts and account visibility.

![User Management](docs/screenshots/ui/user-management.png)

### Highlights

- User account visibility
- Role management
- Account tracking
- Administrative oversight

---

# Security Case Studies

SecureBank includes controlled security scenarios used to demonstrate vulnerability exploitation, remediation, and monitoring workflows.

---

# 1. Broken Access Control (RBAC)

Customer users attempted to access administrator-only security telemetry endpoints.

## Protected Endpoint

```text
/api/security/events
```

---

## Unauthorized Access Attempt

![RBAC Forbidden](docs/screenshots/appsec/rbac-forbidden.png)

The request was denied using backend role validation middleware.

---

## Security Controls Implemented

- JWT role claims
- Role validation middleware
- Protected admin routes
- Access denial handling
- Security event generation

---

# 2. IDOR (Insecure Direct Object Reference)

SecureBank demonstrates object-level authorization using transaction ownership validation.

The vulnerable implementation originally allowed users to access another user's transaction by modifying transaction IDs directly inside API requests.

---

## Vulnerable Request Example

```text
/api/transactions/1
/api/transactions/2
```

---

## Unauthorized Transaction Access

![IDOR Request 1](docs/screenshots/appsec/idor-vulnerable-request-1.png)

![IDOR Request 2](docs/screenshots/appsec/idor-vulnerable-request-2.png)

---

## Root Cause

The original backend implementation validated authentication but failed to verify transaction ownership.

---

## Remediation

Ownership validation was added before returning transaction data.

```js
if (transaction.sender !== req.user.username) {
  return res.status(403).json({
    message: "Access denied",
  });
}
```

---

## Fixed Access Control

![IDOR Fixed](docs/screenshots/appsec/idor-fixed-access-denied.png)

---

## Security Improvements

- Object-level authorization
- Ownership validation
- Secure API access enforcement
- Backend access control protections

---

# 3. File Upload Security

SecureBank also demonstrates unrestricted file upload vulnerabilities and secure upload validation.

---

## Vulnerable Upload Configuration

The original implementation accepted unrestricted file uploads without validation.

![Vulnerable Upload Config](docs/screenshots/appsec/upload-vulnerable-config.png)

---

## Malicious Upload Accepted

A malicious `.jsx` file was uploaded successfully in the vulnerable version.

![Malicious Upload Success](docs/screenshots/appsec/upload-malicious-success.png)

---

# Secure Upload Remediation

MIME validation was later implemented using Multer file filtering.

![Upload Remediation Code](docs/screenshots/appsec/upload-remediation-code.png)

```js
const allowedTypes = ["application/pdf", "image/png", "image/jpeg"];
```

---

## Valid Upload Result

Legitimate files continue to upload successfully.

![Valid Upload](docs/screenshots/appsec/upload-valid-file-success.png)

---

## Blocked Malicious Upload

Invalid file uploads now generate validation failures.

![Blocked Upload](docs/screenshots/appsec/upload-blocked-error.png)

---

## Security Concepts Demonstrated

- Unrestricted file upload risks
- MIME validation
- Secure upload handling
- Defense-in-depth validation
- Backend file filtering

---

# Security Operations & Monitoring

SecureBank includes SOC-style monitoring and operational telemetry tracking.

---

# RBAC Security Event Monitoring

Unauthorized administrative access attempts generate security telemetry events automatically.

![RBAC Security Feed](docs/screenshots/soc/rbac-security-event-feed.png)

---

## Example Security Event

```json
{
  "type": "RBAC_DENIED",
  "severity": "high",
  "user": "customer_user",
  "endpoint": "/api/security/events",
  "description": "Unauthorized access attempt"
}
```

---

## Backend Detection Logic

RBAC violations generate operational telemetry events inside the backend.

![RBAC Detection Code](docs/screenshots/soc/rbac-security-code.png)

---

## Operational Terminal Logs

Authentication and authorization activity is logged operationally.

![RBAC Logs](docs/screenshots/soc/rbac-terminal-logs.png)

---

# Security Metrics API

SecureBank includes protected telemetry endpoints for operational monitoring.

---

## Unauthorized Metrics Access

Requests without authentication are denied.

![Metrics Unauthorized](docs/screenshots/soc/metrics-unauthorized.png)

---

## Authorized Metrics Access

Authenticated requests successfully retrieve telemetry data.

![Metrics Authorized](docs/screenshots/soc/metrics-authorized.png)

---

## Metrics Include

- Failed login attempts
- SQL injection detections
- Threat counters
- Security telemetry
- Protected API activity

---

# Security Testing

SecureBank includes automated backend security regression testing using Jest and Supertest.

![Jest Tests](docs/screenshots/devsecops/jest-tests-pass.png)

---

# Security Test Coverage

## Authentication Middleware

- JWT validation
- Missing token handling
- Invalid token rejection

## RBAC Middleware

- Role validation
- Admin-only route protection
- Unauthorized request blocking

---

## Example Test Structure

```text
middleware/
├── authMiddleware.js
├── authMiddleware.test.js
├── roleMiddleware.js
├── roleMiddleware.test.js
```

---

## Run Tests

```bash
cd backend
npm test
```

---

# 🔄 GitHub Actions Security Pipeline

SecureBank includes an automated DevSecOps CI/CD pipeline using GitHub Actions.

The pipeline validates application security, dependency health, build integrity, and filesystem vulnerabilities before deployment.

## Automated Security Checks

- Backend security regression testing (Jest)
- Frontend build validation
- Dependency vulnerability scanning (`npm audit`)
- Trivy filesystem security scanning
- Semgrep SAST integration
- CI/CD pipeline validation
- Secure build verification

---

## GitHub Actions Workflow Overview

![GitHub Actions Workflow](./assets/github-actions-overview.png)

---

## Successful Pipeline Execution

The SecureBank pipeline successfully validates:

- Backend dependencies
- Frontend dependencies
- Security tests
- Vulnerability scanning
- Trivy filesystem scanning
- Production build integrity

![Pipeline Execution](./assets/trivy-pipeline-success.png)

---

## DevSecOps Security Benefits

- Continuous security validation
- Early vulnerability detection
- Automated dependency scanning
- Secure deployment readiness
- Security integrated into SDLC
- Repeatable and auditable build process

---

## Semgrep SAST Security Validation

SecureBank integrates Semgrep Static Application Security Testing (SAST) into the GitHub Actions CI/CD pipeline to automatically identify insecure coding patterns and security vulnerabilities during development.

The Semgrep integration continuously scans backend source code and security middleware for potential security risks before deployment.

### Semgrep Security Capabilities

- Static application security testing (SAST)
- Automated source code analysis
- Hardcoded secret detection
- Secure coding validation
- CI/CD security enforcement
- Early vulnerability detection

---

## Real Security Finding & Remediation

During pipeline execution, Semgrep detected a hardcoded JWT secret inside a backend authentication test file.

### Security Finding

```text
javascript.jsonwebtoken.security.jwt-hardcode.hardcoded-jwt-secret
```

The finding identified insecure secret handling practices that could expose authentication credentials inside source code repositories.

---

## Remediation Applied

The hardcoded JWT secret was removed and replaced with environment-variable-based secret handling using:

```js
process.env.JWT_SECRET;
```

This remediation aligned the authentication workflow with secure secret management practices and allowed the CI/CD security pipeline to validate successfully.

---

## Security Engineering Workflow Demonstrated

The SecureBank pipeline now demonstrates:

- Automated SAST security scanning
- CI/CD security enforcement
- Vulnerability detection
- Security remediation workflows
- Secure secret management
- Secure SDLC validation

---

# Dockerized Infrastructure

SecureBank runs using Dockerized services managed through Docker Compose.

---

# Services

- Backend API container
- PostgreSQL database container
- Shared internal Docker networking
- Environment-based configuration

---

## Start Environment

```bash
docker compose up --build
```

---

# Technical Stack

## Frontend

- React
- Vite
- Tailwind CSS
- Axios
- React Router
- Lucide React

---

## Backend

- Node.js
- Express.js
- PostgreSQL
- JWT
- Multer
- Jest
- Supertest

---

## Infrastructure

- Docker
- Docker Compose
- GitHub Actions

---

# Security Engineering Skills Demonstrated

- Application Security (AppSec)
- RBAC Authorization
- JWT Authentication
- Secure API Design
- IDOR Prevention
- Secure File Upload Validation
- SOC Monitoring
- Security Telemetry
- Detection Engineering
- Audit Logging
- Docker Infrastructure
- Security Regression Testing
- CI/CD Security Automation
- DevSecOps Engineering

---

# Additional Documentation

| Document                    | Description                             |
| --------------------------- | --------------------------------------- |
| docs/architecture.md        | System architecture and platform design |
| docs/remediation-summary.md | Vulnerability remediation walkthroughs  |
| docs/deployment-notes.md    | Deployment and Docker notes             |

---

# Future Improvements

Planned future enhancements include:

- GitHub CodeQL analysis
- AWS deployment
- Persistent telemetry storage
- SIEM integration
- Infrastructure-as-Code security
- Secret scanning
- Docker hardening

---

# Final Notes

SecureBank was built to simulate realistic security engineering workflows across application security, operational monitoring, and DevSecOps automation.

The project combines vulnerability remediation, backend security controls, telemetry monitoring, automated testing, and CI/CD validation inside a modern full-stack environment.

This repository was designed as a practical security engineering portfolio project focused on defensive security engineering concepts and secure software development practices.
