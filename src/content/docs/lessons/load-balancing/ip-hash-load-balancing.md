---
title: "IP hash load balancing"
description: "IP hash load balancing uses a hash of the client's source IP address to deterministically select a backend server, ensur"
---

**Category:** Load Balancing
**Difficulty:** Beginner
**Reading time:** 5 min read

---

IP hash load balancing uses a hash of the client's source IP address to deterministically select a backend server, ensuring that all requests from the same client IP are consistently routed to the same server without storing session state.

- **Hash function** — a deterministic function that maps the client IP to a consistent integer used to select a backend
- **Modulo mapping** — the hash value is taken modulo the server count to determine the server index
- **Consistent hashing** — a more advanced hash ring that minimizes re-mapping when servers are added or removed
- **Persistence** — IP hash provides stateless session affinity without cookies or server-side session storage
- **NAT traversal problem** — clients behind a single corporate NAT appear as one IP, overloading one backend
- **Server count change** — adding/removing a server changes the modulo mapping, redistributing all sessions
- **Source IP + port hash** — using both IP and port (4-tuple) improves distribution behind NAT

```mermaid
graph LR
    C1[Client 10.1.0.1] -->|hash(10.1.0.1)=1 mod 3 = S2| LB[Load Balancer]
    C2[Client 10.1.0.2] -->|hash(10.1.0.2)=2 mod 3 = S3| LB
    C3[Client 10.1.0.3] -->|hash(10.1.0.3)=0 mod 3 = S1| LB
    LB --> S1[Server 1]
    LB --> S2[Server 2]
    LB --> S3[Server 3]
    style LB fill:#2d5a7a,color:#fff
```

The load balancer hashes the client's source IP address using a hash function (commonly CRC32 or FNV). The resulting integer is divided by the number of active backend servers, and the remainder selects the server index. Because the hash function is deterministic — the same input always produces the same output — requests from the same client IP consistently reach the same backend server across all connections and sessions.

This provides **stateless session affinity**: the load balancer does not need to store a mapping table of client IPs to servers. The mapping is computed on every request from the IP alone. This is more scalable than table-based persistence, which requires memory proportional to the number of distinct clients.

The critical weakness is **server count sensitivity**. Simple modulo hashing means that adding or removing a single server changes nearly all clients' server assignments, because the modulo denominator changes. This causes a massive session disruption — all users effectively start fresh sessions on new servers. Applications that store session data in server memory will lose all sessions.

**Consistent hashing** solves this by placing servers on a virtual ring and hashing each server to multiple positions. Client IPs are also hashed to ring positions; each client maps to the nearest server clockwise on the ring. When a server is added, only the clients whose ring position falls between the new server and its predecessor are remapped — approximately 1/N of all clients. This minimizes session disruption and is used by Nginx upstream (`hash $remote_addr consistent`) and HAProxy's `hash-type consistent`.

- Applications storing session state in server memory where cookie-based persistence is unavailable
- API rate limiting where per-client counters are stored in server memory
- Cache servers where consistent routing ensures cache hits rather than misses
- Database connection pooling where connection state is server-local

| Advantage | Disadvantage |
|-----------|--------------|
| Stateless; no session table memory overhead at the load balancer | Corporate NAT sends all users behind one IP to one server, causing load imbalance |
| Consistent routing enables server-side session state without central storage | Simple modulo hashing disrupts all sessions when server count changes |
| Consistent hashing variant minimizes remapping on server pool changes | Does not account for server load; a hash-heavy server gets stuck with disproportionate traffic |
| Works for any protocol, not just HTTP | IP changes (mobile users switching networks) break affinity and lose sessions |

- [Session persistence (sticky sessions)](session-persistence-sticky-sessions.md)
- [Round-robin algorithm](round-robin-algorithm.md)
- [Cookie-based affinity](cookie-based-affinity.md)

---
*Part of the [Load Balancing](index.md) category · [Back to Master Index](../../index.md)*
