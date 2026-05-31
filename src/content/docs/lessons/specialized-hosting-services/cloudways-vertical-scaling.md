---
title: "Cloudways Vertical Scaling"
description: "Cloudways vertical scaling allows resizing the underlying cloud VM (changing CPU, RAM, and storage) through the dashboar"
---

**Category:** Specialized Hosting Services
**Difficulty:** Intermediate
**Reading time:** 5 min read

---

Cloudways vertical scaling allows resizing the underlying cloud VM (changing CPU, RAM, and storage) through the dashboard, enabling teams to respond to traffic growth or underutilization by adjusting server capacity without migrating applications or reconfiguring the stack.

- **Vertical Scaling** — Increasing or decreasing a server's CPU, RAM, or disk capacity without changing application architecture
- **Server Resize** — The Cloudways operation that triggers a cloud provider instance type change
- **Downtime Window** — The brief period of unavailability during a vertical scale operation
- **Scale Up** — Increasing server resources to handle higher load
- **Scale Down** — Reducing server resources to lower monthly cost during off-peak periods
- **Disk Expansion** — Increasing storage capacity, which is typically irreversible on most providers
- **Application Impact** — Effects on hosted applications during a resize, including connection drops and cache clearing

```mermaid
graph LR
    A[Dashboard Trigger] -->|Scale request| B[Cloud Provider API]
    B -->|Stop instance| C[Shutdown]
    C -->|Resize VM| D[New Instance Type]
    D -->|Start instance| E[Boot]
    E -->|Services restart| F[Application Online]
    F -->|Verify| G[Health Check]
    style A fill:#2d5a7a,color:#fff
    style B fill:#2d5a7a,color:#fff
    style C fill:#2d5a7a,color:#fff
    style D fill:#2d5a7a,color:#fff
    style E fill:#2d5a7a,color:#fff
    style F fill:#2d5a7a,color:#fff
    style G fill:#2d5a7a,color:#fff
```

Vertical scaling on Cloudways is initiated from the server management section of the dashboard. The user selects a new server size from a dropdown of available instance types on the configured cloud provider. Cloudways displays the new monthly cost and warns that the operation requires a brief server restart.

The scaling process calls the cloud provider API to change the instance type. For most providers (DigitalOcean, Vultr, Linode), this requires stopping the VM, resizing it, and restarting. The downtime window typically ranges from 1–5 minutes. AWS and GCP resizes follow provider-specific processes but are similarly brief.

After the instance restarts, all Cloudways services (PHP-FPM, Nginx, MySQL, Redis, Varnish) restart automatically. PHP-FPM worker counts are not automatically adjusted — administrators should manually review and update `pm.max_children` settings after a significant RAM increase to take full advantage of the additional memory.

Disk expansion is handled separately and should be approached with caution — most cloud providers allow only disk expansion (not shrinkage), so unnecessarily large disks cannot be reduced without full server migration.

Cloudways does not support horizontal auto-scaling — adding additional servers under a load balancer in response to traffic spikes. Teams with unpredictable spike traffic patterns requiring zero-downtime capacity expansion should consider providers with native auto-scaling.

- Upgrading a server ahead of an anticipated marketing campaign
- Downgrading after peak season to reduce monthly costs
- Resolving out-of-memory MySQL crashes by adding RAM
- Handling organic traffic growth through incremental capacity increases
- Right-sizing servers based on actual utilization metrics

| Advantage | Disadvantage |
|-----------|--------------|
| Simple dashboard resize without application reconfiguration | Brief downtime required for resize operation |
| Available across all five supported cloud providers | No horizontal auto-scaling capability |
| Cost-effective right-sizing without migration complexity | PHP-FPM settings require manual update after resize |
| Quick response to traffic changes | Disk expansion irreversible on most providers |

- [Cloudways Managed Cloud Hosting](cloudways-managed-cloud-hosting.md)
- [Cloudways Staging Environments](cloudways-staging-environments.md)
- [Cloudways Team Collaboration](cloudways-team-collaboration.md)

---
*Part of the [Specialized Hosting Services](index.md) category · [Back to Master Index](../../index.md)*
