---
title: "Cookie-based affinity"
description: "Cookie-based affinity is the most reliable session persistence method for HTTP workloads, using an HTTP cookie to record"
---

**Category:** Load Balancing
**Difficulty:** Intermediate
**Reading time:** 5 min read

---

Cookie-based affinity is the most reliable session persistence method for HTTP workloads, using an HTTP cookie to record the target backend server so the load balancer can route subsequent requests from the same browser to the same server.

- **LB-injected cookie** — the load balancer sets a cookie containing a server identifier on the first response
- **Application cookie** — the load balancer uses an existing application cookie to derive server affinity
- **Cookie name** — configurable identifier (e.g., `SERVERID`, `JSESSIONID`, `AWSALB` for AWS ALB)
- **Secure flag** — marking the cookie as `Secure` ensures it is only sent over HTTPS
- **HttpOnly flag** — prevents JavaScript from reading the cookie, reducing XSS exposure
- **SameSite attribute** — controls cross-origin cookie sending; important for modern browsers
- **Cookie expiry** — session cookies (no Max-Age) expire when the browser closes; persistent cookies survive

```mermaid
sequenceDiagram
    Browser->>LB: GET / (no affinity cookie)
    LB->>Server2: Forward request
    Server2-->>LB: Response
    LB-->>Browser: Response + Set-Cookie: LBID=enc(server2); Secure; HttpOnly
    Browser->>LB: GET /page (Cookie: LBID=enc(server2))
    LB->>Server2: Route to server2 (affinity active)
    Server2-->>Browser: Response
```

On the first request from a new client, the load balancer selects a backend server and inserts a Set-Cookie header into the response. The cookie value encodes the selected server — either as a plain name/ID or as an encrypted/signed value to prevent tampering (e.g., AWS ALB uses HMAC-signed `AWSALB` cookies).

The browser automatically includes the cookie in all subsequent requests to the same origin. The load balancer reads the cookie value from incoming requests, decodes the server identifier, and routes directly to that server, bypassing the normal selection algorithm.

**LB-injected cookies** are fully transparent to the application — the app never sees the affinity cookie. This is the cleanest approach and requires no application changes. **Application cookie** mode reads a cookie the application itself sets (e.g., `JSESSIONID`) and hashes its value to consistently select the same backend.

**Cookie encryption** is important for security. A plaintext cookie containing `server2` leaks internal server names and allows clients to forge affinity to a specific backend. Most commercial and cloud load balancers encrypt and sign the cookie value to prevent this.

**AWS ALB** uses the `AWSALB` cookie for target group stickiness and `AWSALBAPP` for application-controlled stickiness. The stickiness duration is configurable (1 second to 7 days). When a target becomes unhealthy, ALB automatically routes the client to a healthy target and updates the cookie.

When using **HTTPS-only sites**, the `Secure` attribute should always be set. Combined with `HttpOnly`, this ensures the affinity cookie is only sent over encrypted connections and is not accessible to JavaScript, following cookie security best practices.

- Web applications with server-side PHP sessions needing transparent sticky routing
- E-commerce checkout flows requiring consistent server assignment through the purchase
- Applications that use application-session-backed WebSocket connections
- Gradual feature flag rollouts where user affinity must be preserved per session

| Advantage | Disadvantage |
|-----------|--------------|
| Works correctly behind NAT; each browser gets its own cookie | Requires HTTP/HTTPS; not applicable to TCP or UDP protocols |
| More reliable than IP-based affinity for mobile clients that change IPs | Clients that block cookies (or use privacy browsers) bypass affinity | 
| Encrypted cookies prevent server topology disclosure | Adds a small overhead to inspect and parse the cookie on every request |
| Configurable expiry controls how long affinity persists | Session sharing across subdomains requires careful cookie domain attribute configuration |

- [Session persistence (sticky sessions)](session-persistence-sticky-sessions.md)
- [Source IP affinity](source-ip-affinity.md)
- [SSL/TLS offloading](ssl-tls-offloading.md)

---
*Part of the [Load Balancing](index.md) category · [Back to Master Index](../../index.md)*
