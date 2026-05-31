---
title: "Domain Validation (DV) Certificates"
description: "Domain Validation certificates are the most widely issued SSL/TLS certificate type, proving only that the applicant cont"
---

**Category:** SSL/TLS & Certificates
**Difficulty:** Beginner
**Reading time:** 5 min read

---

Domain Validation certificates are the most widely issued SSL/TLS certificate type, proving only that the applicant controls the domain. They enable encrypted HTTPS without identity verification, are issuable in minutes via automation, and form the basis of Let's Encrypt's free certificate infrastructure.

- **Domain Control Validation (DCV)** — The process confirming the applicant controls the domain
- **HTTP Challenge** — A DCV method placing a CA-provided file at `/.well-known/acme-challenge/`
- **DNS Challenge** — A DCV method adding a CA-provided TXT record to the domain's DNS zone
- **Email Challenge** — A DCV method sending a validation email to WHOIS-registered addresses
- **ACME Protocol** — Automated Certificate Management Environment; the standard for DV automation
- **CAA Record** — A DNS record restricting which CAs may issue certificates for a domain
- **Certificate Transparency (CT) Log** — A public append-only log where all issued certificates are recorded

```mermaid
graph LR
    A[Certificate Request] -->|Submit domain| B[Certificate Authority]
    B -->|Issue challenge| C[HTTP or DNS Challenge]
    C -->|Applicant completes| D[Challenge File/DNS Record]
    D -->|CA validates| E[Challenge Verified]
    E -->|Issue cert| F[DV Certificate]
    F -->|Install| G[Web Server]
    style A fill:#2d5a7a,color:#fff
    style B fill:#2d5a7a,color:#fff
    style C fill:#2d5a7a,color:#fff
    style D fill:#2d5a7a,color:#fff
    style E fill:#2d5a7a,color:#fff
    style F fill:#2d5a7a,color:#fff
    style G fill:#2d5a7a,color:#fff
```

DV certificates require only proof of domain control. The most common validation methods are the ACME HTTP-01 challenge (placing a token file at a specified URL on port 80) and the ACME DNS-01 challenge (adding a `_acme-challenge.example.com` TXT record containing the challenge token).

For HTTP-01, the CA contacts `http://example.com/.well-known/acme-challenge/{token}` and verifies the file contents match the expected value. This requires the requesting server to be accessible on port 80 from the internet, making it unsuitable for internal services or wildcard certificates.

DNS-01 places a TXT record in the domain's DNS zone. The CA queries for this record using authoritative DNS lookups, which can be performed from any CA infrastructure location. DNS-01 supports wildcard certificate issuance and works for domains not exposed on port 80.

Certificate Transparency logs publish all issued DV certificates to public append-only logs (Google CT, Sectigo CT). This allows domain owners to monitor for unauthorized certificate issuance via services like crt.sh or certificate transparency notification services.

CAA DNS records restrict issuance authority: `example.com. IN CAA 0 issue "letsencrypt.org"` permits only Let's Encrypt to issue certificates for the domain, and well-configured CAs refuse to issue certificates in violation of CAA policy.

- Internal APIs and developer tools needing encryption without identity verification
- Automated HTTPS for all sites using Let's Encrypt and ACME
- Wildcard certificates for CDN or SaaS platforms with dynamic subdomains
- Staging and development environments with real HTTPS certificates
- Organizations with hundreds of domains needing automated lifecycle management

| Advantage | Disadvantage |
|-----------|--------------|
| Fully automated issuance via ACME protocol | No organization identity in the certificate |
| Free from Let's Encrypt — no cost barrier | Short 90-day validity requires automation for renewal |
| Issued in minutes without manual review | Phishing sites can obtain DV certificates equally easily |
| CAA records restrict unauthorized issuance | HTTP-01 challenge requires port 80 accessibility |

- [SSL Certificate Types](ssl-certificate-types.md)
- [Let's Encrypt Automation](lets-encrypt-automation.md)
- [ACME Protocol Implementation](acme-protocol-implementation.md)

---
*Part of the [SSL/TLS & Certificates](index.md) category · [Back to Master Index](../../index.md)*
