---
title: "Planned Maintenance Strategies"
description: "Planned maintenance strategies enable organizations to perform upgrades, patches, and hardware replacements on productio"
---

**Category:** High Availability Design
**Difficulty:** Intermediate
**Reading time:** 5 min read

---

Planned maintenance strategies enable organizations to perform upgrades, patches, and hardware replacements on production systems without customer-visible downtime. Rolling updates, blue/green deployments, and maintenance windows with graceful traffic draining are the primary techniques for achieving continuous availability during routine maintenance.

- **Rolling update** — updating instances one at a time while others continue serving traffic
- **Blue/green deployment** — maintaining two identical environments; switching traffic between them
- **Canary deployment** — routing a small percentage of traffic to the updated version before full rollout
- **Drain** — gracefully removing a server from load balancer rotation while completing in-flight requests
- **Maintenance window** — scheduled low-traffic period for maintenance requiring brief downtime
- **Pre-maintenance health check** — verifying system health before starting maintenance
- **Change freeze** — period during which no changes are permitted (holidays, high-traffic events)
- **Rollback plan** — documented procedure to revert changes if maintenance causes issues

```mermaid
graph LR
    A[All 3 Servers Active] --> B[Drain Server 1]
    B --> C[Upgrade Server 1]
    C --> D[Return Server 1 to Pool]
    D --> E[Drain Server 2]
    E --> F[Upgrade Server 2]
    F --> G[All Servers Upgraded]
    style A fill:#2d5a7a,color:#fff
    style B fill:#2d5a7a,color:#fff
    style C fill:#2d5a7a,color:#fff
    style D fill:#2d5a7a,color:#fff
    style E fill:#2d5a7a,color:#fff
    style F fill:#2d5a7a,color:#fff
    style G fill:#2d5a7a,color:#fff
```

Rolling updates cycle through instances sequentially, ensuring a minimum number are always available. The load balancer is instructed to drain the target instance—stopping new connections while existing connections complete—then the instance undergoes maintenance, and finally it is returned to the load balancer pool. Kubernetes rolling updates control the pace through maxSurge (extra pods allowed during update) and maxUnavailable (pods that can be down simultaneously) parameters.

Blue/green deployments maintain two complete production environments. The "blue" environment serves all live traffic while "green" is prepared with the new version. After testing green in isolation, a single traffic switch (at the load balancer or DNS level) moves all traffic from blue to green in seconds. If issues arise, traffic is immediately switched back to blue. This approach provides instant rollback capability but doubles infrastructure cost during the transition period.

Canary deployments mitigate risk by exposing a small fraction (1-10%) of traffic to the new version. Monitoring for error rates, latency regressions, and business metrics runs over the canary period. If metrics are healthy, traffic percentage increases incrementally until 100% of traffic is on the new version. Feature flag systems extend this concept, enabling per-user or per-cohort gradual rollouts.

For infrastructure changes that genuinely require brief downtime (major database schema changes, firmware updates), maintenance windows during off-peak hours remain appropriate. Advance notification to customers, automated pre- and post-maintenance checks, and ready rollback procedures minimize customer impact.

- Kubernetes workloads using rolling deployments for application updates
- Blue/green DNS switching for major application version upgrades
- Database primary switchover during hardware maintenance
- OS patching via rolling reboot of cluster members
- Network equipment firmware upgrades using redundant paths

| Advantage | Disadvantage |
|-----------|--------------|
| Rolling updates require no additional infrastructure | Rolling updates run mixed versions simultaneously |
| Blue/green provides instant rollback capability | Blue/green doubles infrastructure cost during transition |
| Canary releases catch issues before full exposure | Canary deployment requires sophisticated traffic splitting |
| Drain ensures no in-flight requests are terminated | Drain can take minutes for long-lived connections |

- [Zero-Downtime Deployments](zero-downtime-deployments.md)
- [Graceful Degradation](graceful-degradation.md)
- [HA Testing Procedures](ha-testing-procedures.md)

---
*Part of the [High Availability Design](index.md) category · [Back to Master Index](../../index.md)*
