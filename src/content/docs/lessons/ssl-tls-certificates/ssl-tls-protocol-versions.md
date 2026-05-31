---
title: "SSL/TLS Protocol Versions"
description: "SSL (Secure Sockets Layer) and TLS (Transport Layer Security) are cryptographic protocols securing communications over n"
---

**Category:** SSL/TLS & Certificates
**Difficulty:** Intermediate
**Reading time:** 6 min read

---

SSL (Secure Sockets Layer) and TLS (Transport Layer Security) are cryptographic protocols securing communications over networks. Modern deployments use TLS 1.2 and TLS 1.3, with all prior versions deprecated due to known vulnerabilities including POODLE, BEAST, and DROWN attacks.

- **SSL 3.0** — The last SSL version, deprecated in 2015 (RFC 7568) due to the POODLE attack
- **TLS 1.0/1.1** — Deprecated in 2020 by major browsers and in 2021 by RFC 8996 due to known weaknesses
- **TLS 1.2** — The current minimum acceptable version, supporting forward secrecy and modern cipher suites
- **TLS 1.3** — The latest version (2018), removing weak algorithms and reducing handshake round trips
- **Record Protocol** — The TLS sublayer fragmenting and encrypting application data
- **Alert Protocol** — TLS mechanism for communicating error conditions and session closure
- **Protocol Negotiation** — The handshake process where client and server agree on a protocol version

```mermaid
graph LR
    A[SSL 2.0 1995] -->|Deprecated| B[SSL 3.0 1996]
    B -->|Deprecated POODLE| C[TLS 1.0 1999]
    C -->|Deprecated| D[TLS 1.1 2006]
    D -->|Deprecated| E[TLS 1.2 2008]
    E -->|Current minimum| F[TLS 1.3 2018]
    style A fill:#2d5a7a,color:#fff
    style B fill:#2d5a7a,color:#fff
    style C fill:#2d5a7a,color:#fff
    style D fill:#2d5a7a,color:#fff
    style E fill:#2d5a7a,color:#fff
    style F fill:#2d5a7a,color:#fff
```

TLS operates over TCP after the TCP three-way handshake completes. The TLS handshake begins with the client sending a `ClientHello` message listing supported protocol versions, cipher suites, and random data. The server responds with `ServerHello` selecting the highest mutually supported version and cipher suite, its certificate, and random data.

In TLS 1.2, the key exchange phase uses RSA or ephemeral Diffie-Hellman (DHE/ECDHE) to establish a pre-master secret. Both sides derive session keys from this secret and the exchanged random values. The handshake requires two round trips before application data can flow.

TLS 1.3 simplifies and strengthens the handshake by removing support for weak algorithms (RSA key exchange, MD5, SHA-1, CBC cipher modes), requiring forward secrecy via ephemeral key exchange for all connections, and reducing the handshake to one round trip. Session resumption in TLS 1.3 uses pre-shared keys (PSK), enabling zero-round-trip (0-RTT) resumption for returning clients at the cost of replay attack exposure for non-idempotent requests.

Version negotiation uses the `supported_versions` extension in TLS 1.3, separate from the legacy `ClientHello` version field, preventing downgrade attacks where a middleman could force clients to negotiate weaker versions.

- Configuring web servers to reject TLS 1.0/1.1 connections
- Enabling TLS 1.3 for improved performance on mobile clients
- PCI DSS compliance requiring TLS 1.2 minimum
- Diagnosing SSL handshake failures from deprecated protocol negotiation
- Auditing server configurations for cipher suite and version compliance

| Advantage | Disadvantage |
|-----------|--------------|
| TLS 1.3 reduces handshake latency by one round trip | 0-RTT resumption vulnerable to replay attacks |
| Forward secrecy in TLS 1.3 mandatory for all connections | Some legacy clients (Java 6, old Android) don't support TLS 1.3 |
| Removing weak algorithms in TLS 1.3 reduces attack surface | Dropping TLS 1.0/1.1 breaks access for very old browsers |
| TLS 1.2 remains widely compatible baseline | TLS 1.2 supports weak cipher suites if misconfigured |

- [TLS 1.2 vs TLS 1.3](tls-1-2-vs-tls-1-3.md)
- [SSL/TLS Cipher Suites](ssl-tls-cipher-suites.md)
- [Perfect Forward Secrecy (PFS)](perfect-forward-secrecy-pfs.md)

---
*Part of the [SSL/TLS & Certificates](index.md) category · [Back to Master Index](../../index.md)*
