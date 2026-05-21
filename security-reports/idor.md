# IDOR Vulnerability Report

## Vulnerability

Insecure Direct Object Reference (IDOR)

## Affected Endpoint

GET /api/transactions/:id

## Description

The application allows authenticated users to access transaction records belonging to other users by modifying the transaction ID in the API request.

## Exploitation Steps

1. Authenticate using a valid JWT token
2. Send request to:
   /api/transactions/102
3. Observe unauthorized transaction data returned

## Business Impact

This vulnerability could allow unauthorized access to sensitive financial transaction records, potentially exposing user financial activity and violating access control requirements.

## Root Cause

The backend does not validate whether the authenticated user owns the requested transaction.

## Recommended Remediation

Implement ownership validation to ensure users can only access their own transaction records.

## Remediation Implemented

The vulnerable endpoint was updated to enforce ownership validation using authenticated JWT user identity.

### Security Improvements

- Added JWT-protected middleware to the endpoint
- Validated transaction ownership against authenticated user identity
- Blocked unauthorized access attempts with HTTP 403 responses

### Result

Authenticated users can now access only their own transaction records.
