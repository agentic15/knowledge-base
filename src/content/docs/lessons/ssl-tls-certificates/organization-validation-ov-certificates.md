---
title: "Organization Validation (OV) Certificates"
description: "Organization Validation certificates extend domain validation with CA-verified organization identity, embedding the lega"
---

**Category:** SSL/TLS & Certificates
**Difficulty:** Intermediate
**Reading time:** 5 min read

---

Organization Validation certificates extend domain validation with CA-verified organization identity, embedding the legal entity's name and country into the certificate's Subject field. They bridge the gap between automated DV issuance and full EV verification, providing meaningful identity assurance for business-facing applications.

- **Subject DN** — The Distinguished Name field containing Organization (O), Country (C), and other identity attributes
- **Vetting Process** — CA procedures for verifying organization legal existence and identity
- **Third-Party Database** — Government registries, Dun & Bradstreet, or similar sources used for vetting
- **Callback Verification** — A CA phone call to the organization's verified number to confirm the request
- **Issuance Timeframe** — Typically 1–5 business days for OV versus minutes for DV
- **SAN Extension** — Subject Alternative Names listing all covered hostnames
- **Certificate Details View** — Browser UI showing organization name in certificate info panel

```mermaid
graph LR
    A[OV Request Submitted] -->|Domain control check| B[DCV Validation]
    B -->|Org identity check| C[Registry Lookup]
    C -->|Phone callback| D[Authorized Contact]
    D -->|Verified| E[OV Certificate Issued]
    E -->|Organization in Subject| F[Certificate Deployed]
    style A fill:#2d5a7a,color:#fff
    style B fill:#2d5a7a,color:#fff
    style C fill:#2d5a7a,color:#fff
    style D fill:#2d5a7a,color:#fff
    style E fill:#2d5a7a,color:#fff
    style F fill:#2d5a7a,color:#fff
```

OV issuance adds organization verification steps after domain control validation. The CA checks the organization's legal name against government business registries (Companies House in the UK, state registry in the US, etc.) or third-party identity databases. The requester must provide the legal organization name matching registry records exactly.

A phone verification step is common — the CA identifies the organization's publicly listed phone number (not one provided by the applicant), calls it, and asks the recipient to confirm the certificate request. This callback to a third-party verified number prevents fraudulent issuance to entities impersonating a legitimate organization.

Once verified, the CA issues a certificate with the organization's legal name in the Subject Organization field and the country in the Subject Country field. Users who click the padlock in their browser and navigate to certificate details see this information, providing verified identity assurance beyond just encryption.

OV certificates are available from commercial CAs (DigiCert, Sectigo, GlobalSign) and typically cost $50–$500 per year depending on scope. Unlike DV, OV cannot be automated via ACME alone — the vetting process requires human interaction, though some CAs offer organization pre-vetting to speed future issuances.

- Business websites where customers inspect certificate details to verify identity
- B2B SaaS applications serving enterprise customers with security requirements
- Government-adjacent services requiring verifiable organization attribution
- Industries where DV is contractually insufficient (financial services, healthcare)
- Organizations with security policies requiring non-DV certificates

| Advantage | Disadvantage |
|-----------|--------------|
| Organization name visible in certificate details provides identity assurance | Manual vetting delays issuance to days rather than minutes |
| Higher CA scrutiny reduces impersonation risk | Organization details must match registry records exactly |
| Satisfies compliance policies requiring identity-verified certificates | More expensive than DV certificates |
| Certificates convey the issuing organization to technically savvy users | Mainstream browsers no longer show organization prominently in UI |

- [SSL Certificate Types](ssl-certificate-types.md)
- [Extended Validation (EV) Certificates](extended-validation-ev-certificates.md)
- [Certificate Authority (CA) Hierarchy](certificate-authority-ca-hierarchy.md)

---
*Part of the [SSL/TLS & Certificates](index.md) category · [Back to Master Index](../../index.md)*
