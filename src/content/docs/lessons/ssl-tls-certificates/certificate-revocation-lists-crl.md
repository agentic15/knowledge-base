---
title: "Certificate Revocation Lists (CRL)"
description: "Certificate Revocation Lists are CA-published files listing serial numbers of certificates that have been revoked before"
---

**Category:** SSL/TLS & Certificates
**Difficulty:** Intermediate
**Reading time:** 5 min read

---

Certificate Revocation Lists are CA-published files listing serial numbers of certificates that have been revoked before their natural expiration, allowing TLS clients to check whether a presented certificate remains valid. CRLs predate OCSP and are now supplemented or replaced by OCSP in most deployments.

- **CRL** — A CA-signed DER or PEM encoded list of revoked certificate serial numbers
- **CRL Distribution Point (CDP)** — Certificate extension containing the URL(s) where the CRL is published
- **Full CRL** — Complete list of all currently revoked non-expired certificates from the CA
- **Delta CRL** — Incremental list of changes since the last full CRL, reducing download size
- **thisUpdate / nextUpdate** — CRL timestamps indicating issue time and next expected update
- **Revocation Reason** — Optional OID in the CRL entry indicating why the certificate was revoked
- **CRL Size** — The cumulative size issue for high-volume CAs; large CRLs are impractical for browsers

```mermaid
graph LR
    A[CA Revokes Certificate] -->|Adds serial to CRL| B[Updated CRL Published]
    B -->|At CDP URL| C[CRL Distribution Point]
    D[TLS Client] -->|Fetch CRL| C
    C -->|DER/PEM file| D
    D -->|Search serial number| E[Found? Reject / Not Found? Accept]
    style A fill:#2d5a7a,color:#fff
    style B fill:#2d5a7a,color:#fff
    style C fill:#2d5a7a,color:#fff
    style D fill:#2d5a7a,color:#fff
    style E fill:#2d5a7a,color:#fff
```

When a CA revokes a certificate, it adds that certificate's serial number to its CRL at the next CRL publication cycle. CRLs are published at URLs specified in the Certificate Distribution Point extension of issued certificates. CRLs are signed by the issuing CA, allowing clients to verify authenticity.

A client checking revocation downloads the full CRL from the CDP URL, searches for the presented certificate's serial number, and rejects the connection if found. CRLs have a `nextUpdate` field indicating when the next CRL will be published — typically every 24 hours to 7 days depending on the CA.

The fundamental scalability problem with CRLs is their size. A high-volume CA issuing millions of certificates accumulates a CRL that can reach megabytes in size. Browsers cannot download multi-megabyte files for every HTTPS connection — the latency and bandwidth costs are prohibitive. Let's Encrypt's CRL for its R3 intermediate was hundreds of megabytes before the transition to OCSP.

Delta CRLs address the size issue by publishing only revocations since the last full CRL, but require clients to maintain a locally cached full CRL and apply deltas incrementally — a complexity most browser implementations avoid.

Browsers largely abandoned CRL checking in favor of OCSP due to these size issues. Mozilla and Google now use Google's CRLite and Mozilla's CRLite (probabilistic data structures compressing CRL information into browser-embedded databases) as offline revocation mechanisms.

- Enterprise PKI where CRL size is manageable for internal CA use
- IoT device firmware checking certificates against embedded CRL
- Server-to-server mutual TLS where CRL download cost is acceptable
- Long-lived certificates where periodic revocation checks are sufficient
- Legacy TLS library environments that check CRL but not OCSP

| Advantage | Disadvantage |
|-----------|--------------|
| No real-time dependency on CA infrastructure for verification | CRL download size impractical for high-volume public CAs |
| Cacheable for long periods, reducing network overhead | thisUpdate/nextUpdate creates revocation delay window |
| Supports offline environments with pre-downloaded CRLs | Full CRL must be re-downloaded entirely after expiration |
| Delta CRLs reduce bandwidth for incremental checking | Delta CRL support requires local CRL caching infrastructure |

- [OCSP (Online Certificate Status Protocol)](ocsp-online-certificate-status-protocol.md)
- [OCSP Stapling](ocsp-stapling.md)
- [Certificate Lifecycle Management](certificate-lifecycle-management.md)

---
*Part of the [SSL/TLS & Certificates](index.md) category · [Back to Master Index](../../index.md)*
