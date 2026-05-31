---
title: "DNS over TLS (DoT)"
description: "DNS over TLS (DoT) encrypts DNS queries using TLS on a dedicated port 853, providing privacy and integrity protection at"
---

**Category:** DNS Infrastructure
**Difficulty:** Intermediate
**Reading time:** 6 min read

---

DNS over TLS (DoT) encrypts DNS queries using TLS on a dedicated port 853, providing privacy and integrity protection at the transport layer while maintaining the standard DNS wire format. Defined in RFC 7858, DoT is supported by major recursive resolvers and is commonly used in mobile and enterprise environments.

- **RFC 7858** — The IETF standard defining DNS over TLS on TCP port 853
- **Port 853** — The dedicated IANA-assigned port for DoT, distinguishable from standard DNS (port 53) at the network level
- **TLS Handshake** — The initial negotiation establishing an encrypted channel, verifying the resolver certificate against a CA or SPKI pin
- **Opportunistic vs Strict Mode** — Opportunistic mode encrypts when possible but falls back to plaintext; strict mode requires valid TLS or fails the connection
- **SPKI Pinning** — Storing the hash of a resolver certificate public key to detect certificate substitution attacks
- **Connection Keep-Alive** — Maintaining persistent TLS connections to amortize handshake overhead across multiple queries

```mermaid
graph LR
    A[DNS Client] --> B[TCP Connect Port 853]
    B --> C[TLS Handshake]
    C --> D[Certificate Verify]
    D --> E[Encrypted DNS Query]
    E --> F[DoT Resolver]
    F --> G[Encrypted Response]
    G --> A
    style A fill:#2d5a7a,color:#fff
    style B fill:#2d5a7a,color:#fff
    style C fill:#2d5a7a,color:#fff
    style D fill:#2d5a7a,color:#fff
    style E fill:#2d5a7a,color:#fff
    style F fill:#2d5a7a,color:#fff
    style G fill:#2d5a7a,color:#fff
```

DoT wraps standard DNS messages in TLS on TCP port 853. The client initiates a TCP connection, performs a TLS handshake with server certificate validation, and then sends DNS queries as length-prefixed messages over the established TLS session. Multiple queries can share the same TLS connection using keep-alive, reducing the per-query overhead of TLS setup.

Unlike DoH, DoT uses a distinct port (853), making it easily identifiable at the network level. Network administrators can allow, block, or redirect DoT traffic independently from HTTPS. This visibility is both an advantage (allows network policy enforcement) and a disadvantage (firewalls can block port 853 to force fallback to unencrypted DNS).

Clients implement DoT in two security modes. Opportunistic mode (RFC 7858 default) attempts TLS but falls back to plaintext UDP/TCP DNS if TLS fails — providing encryption-in-transit without authentication. Strict mode requires TLS to succeed with a valid server certificate matching an expected hostname or SPKI pin, failing the query if TLS cannot be established. Android 9+ uses strict DoT with Google or Cloudflare resolvers configured through Private DNS settings.

On the server side, DoT resolvers like Cloudflare (1.1.1.1), Google (8.8.8.8), and Quad9 (9.9.9.9) operate standard DoT endpoints. Self-hosted implementations use stunnel, BIND with TLS, or Unbound with tls-service-pem configurations.

- Securing DNS on mobile devices using Android Private DNS feature
- Enterprise deployment of encrypted DNS to internal corporate resolvers
- ISP DoT services providing encrypted resolution to subscribers
- IoT device DNS encryption where DoH HTTPS overhead is excessive
- Network monitoring deployments requiring visibility into encrypted DNS (DoT more visible than DoH)

| Advantage | Disadvantage |
|-----------|--------------|
| Network-visible on port 853, enabling firewall policy | Port 853 blocking forces fallback to unencrypted DNS |
| Lower overhead than DoH for non-browser use cases | TLS handshake adds latency on first connection |
| Strict mode prevents resolver substitution attacks | SPKI pinning requires manual key management |
| Supports keep-alive for connection reuse efficiency | Not natively supported in web browsers (DoH preferred) |

- [DNS over HTTPS (DoH)](dns-over-https-doh.md)
- [Recursive DNS Resolvers](recursive-dns-resolvers.md)
- [DNS Performance Optimization](dns-performance-optimization.md)

---
*Part of the [DNS Infrastructure](index.md) category · [Back to Master Index](../../index.md)*
