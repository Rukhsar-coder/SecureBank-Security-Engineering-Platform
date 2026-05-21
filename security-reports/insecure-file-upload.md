# Unrestricted File Upload Vulnerability Report

## Vulnerability

Unrestricted File Upload

## Affected Endpoint

POST /api/upload/kyc

## Description

The application accepts uploaded files without validating file type, extension, or content.

## Exploitation Steps

1. Create a potentially unsafe file:
   malicious.php

2. Upload file using:
   POST /api/upload/kyc

3. Observe successful upload response from server

## Business Impact

This vulnerability could allow attackers to upload malicious files, potentially leading to malware hosting, phishing content distribution, or remote code execution depending on server configuration.

## Root Cause

The backend does not validate uploaded file types or restrict dangerous file extensions.

## Recommended Remediation

Implement strict file type validation, extension filtering, file size limits, and secure storage handling for uploaded content.
