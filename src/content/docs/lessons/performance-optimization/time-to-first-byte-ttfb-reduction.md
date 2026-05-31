---
title: "Time to First Byte (TTFB) Reduction"
description: "Time to First Byte (TTFB) measures the duration from when a browser sends an HTTP request to when it receives the first "
---

**Category:** Performance Optimization
**Difficulty:** Intermediate
**Reading time:** 6 min read

---

Time to First Byte (TTFB) measures the duration from when a browser sends an HTTP request to when it receives the first byte of the server's response, making it a key indicator of server-side processing efficiency, network latency, and infrastructure performance. High TTFB delays all subsequent rendering, amplifying the impact of every other performance problem on the page. Reducing TTFB requires addressing the bottlenecks across DNS resolution, TCP connection, TLS negotiation, server processing, and network transit time.

- **TTFB** — the elapsed time from the initial HTTP request being sent to the first byte of the HTTP response being received
- **Server Processing Time** — the time the server spends executing application code, querying databases, and assembling the response
- **DNS Lookup** — the time resolving a domain name to an IP address; cached lookups are near-instant, uncached can add 50–200ms
- **TCP Handshake** — the three-way exchange establishing a TCP connection; typically 1 round-trip time (RTT) per connection
- **TLS Handshake** — additional round trips for establishing an encrypted HTTPS connection, adding 1–2 RTTs on top of TCP
- **Content Delivery Network (CDN)** — a distributed edge server network that caches responses geographically close to users, reducing network RTT
- **Edge Computing** — executing application logic at CDN edge nodes rather than origin servers, eliminating core datacenter round trips
- **Keep-Alive** — HTTP connection reuse that eliminates per-request TCP + TLS handshake overhead for subsequent requests

```mermaid
graph LR
    A[Browser Request] --> B[DNS Resolution]
    B --> C[TCP Handshake]
    C --> D[TLS Handshake]
    D --> E[Server Processing]
    E --> F[Network Transit]
    F --> G[First Byte Received]
    style E fill:#2d5a7a,color:#fff
    style D fill:#2d5a7a,color:#fff
    style B fill:#2d5a7a,color:#fff
```

TTFB improvement strategies must target the specific component causing delay. Chrome DevTools' Network panel shows each phase — DNS, TCP, SSL, Request, Response — allowing precise diagnosis before optimization.

DNS latency is addressed through DNS prefetching (`<link rel="dns-prefetch" href="//api.example.com">`), using fast DNS resolvers, and reducing TTL values so changes propagate quickly. For high-traffic domains, Anycast DNS routes resolution requests to the nearest DNS server in a global network.

TCP and TLS overhead is minimized through HTTP/2 or HTTP/3, which multiplex multiple requests over a single connection, and through TLS session resumption, which allows clients returning to a server to resume an existing TLS session without a full handshake. QUIC (used by HTTP/3) combines TCP and TLS setup into a single round trip.

Server processing time — often the largest contributor to TTFB — requires application-level optimization. Database query caching with Redis or Memcached prevents repeated expensive queries. Full-page caching serves pre-built responses for common requests without application processing. For dynamic content, edge-side includes (ESI) or partial caching can serve cached fragments with only dynamic portions requiring processing.

CDN deployment routes requests to edge servers geographically close to users, converting transcontinental round trips (100–300ms) to regional hops (5–20ms). CDNs also handle TLS termination at the edge, meaning users connect to a nearby server for encryption while backend traffic uses optimized routes.

- E-commerce sites where TTFB delays directly impact conversion rates
- News and media sites serving geographically distributed audiences
- APIs where low latency is a contractual SLA requirement
- Single-page applications where the initial HTML document TTFB gates all subsequent loading
- Mobile web experiences where network conditions amplify any latency

| Advantage | Disadvantage |
|-----------|--------------|
| CDN deployment immediately reduces TTFB for geographically distant users | CDN costs increase with traffic volume; requires careful cache invalidation strategy |
| Edge computing eliminates origin round trips for processed responses | Edge function cold starts can temporarily worsen TTFB for infrequent traffic patterns |
| HTTP/3 reduces handshake overhead especially on high-loss mobile networks | HTTP/3 requires QUIC support in load balancers and infrastructure |
| Server-side caching dramatically reduces processing time for cacheable content | Cache invalidation complexity increases with dynamic content requirements |

- [Page Load Time Optimization](page-load-time-optimization.md)
- [Browser Caching Strategies](browser-caching-strategies.md)
- [DNS Prefetching](dns-prefetching.md)

---
*Part of the [Performance Optimization](index.md) category · [Back to Master Index](../../index.md)*
