---
title: "Virtual Host Isolation"
description: "Virtual host isolation ensures that multiple sites hosted on the same physical server cannot read each other's files, ex"
---

**Category:** Web Server Technologies
**Difficulty:** Advanced
**Reading time:** 6 min read

---

Virtual host isolation ensures that multiple sites hosted on the same physical server cannot read each other's files, execute code in each other's context, or exhaust resources to degrade neighbors. Isolation is achieved through a combination of OS user separation, PHP process isolation, filesystem permissions, and resource controls. Without proper isolation, a compromised site can pivot to attack others on the same server.

- **User isolation** — running each site under a unique system user so filesystem permissions prevent cross-site reads
- **PHP-FPM pool** — separate PHP-FPM worker pool per site, running as the site's system user
- **open_basedir** — PHP configuration restricting PHP's filesystem access to a defined directory tree
- **CageFS** — CloudLinux technology providing a virtualized per-user filesystem, preventing visibility into other users' files
- **suPHP / suEXEC** — Apache mechanisms executing PHP or CGI scripts as the owner's user, not the web server user
- **chroot** — OS-level filesystem isolation confining a process to a subtree, preventing access to the wider filesystem
- **LVE (Lightweight Virtual Environment)** — CloudLinux per-tenant CPU, memory, and I/O resource limits
- **tmpfs per-user** — per-user temporary directory preventing `/tmp` file disclosure between tenants

```mermaid
graph TD
    A[Site A Request] --> B[PHP-FPM Pool A - runs as user_a]
    C[Site B Request] --> D[PHP-FPM Pool B - runs as user_b]
    B --> E[/home/user_a - readable only by user_a]
    D --> F[/home/user_b - readable only by user_b]
    G[CageFS] -->|virtualizes filesystem per user| B
    G -->|virtualizes filesystem per user| D
    H[LVE Resource Limits] --> B
    H --> D
    style A fill:#2d5a7a,color:#fff
    style G fill:#2d5a7a,color:#fff
    style H fill:#2d5a7a,color:#fff
```

The foundation of virtual host isolation is OS user separation. Each hosting account is assigned a unique Linux user (e.g., `site1user`). The document root, log files, and configuration files for that site are owned by this user with permissions set to prevent the web server's generic user (www-data, nobody) or other site users from reading them.

PHP execution must also run as the site owner. The web server's default PHP handler (mod_php or a shared PHP-FPM pool) runs as the web server user, meaning all PHP scripts share that user's file access — defeating user isolation entirely. The solution is per-site PHP-FPM pools configured with `user = site1user` and `group = site1user`. This ensures PHP file reads and writes operate under the site owner's permissions, and a compromised PHP script in one site cannot read files owned by another user.

`open_basedir` adds a PHP-level restriction: `/home/site1user/:/tmp/site1tmp/` limits PHP's file access to the site's home directory and a site-specific temp directory. This catches attempts to read `/etc/passwd`, other users' home directories, or configuration files outside the allowed path. Combining open_basedir with per-site PHP-FPM pools provides defense in depth.

CloudLinux's CageFS takes isolation further by virtualizing the entire filesystem view per user. Each user sees a private `/etc`, `/usr`, and `/tmp` drawn from a master template but isolated from other users' copies. System binaries are available but user-specific files (password hashes, other users' files) are invisible.

Log file isolation prevents tenants from seeing each other's access patterns: per-virtual-host `CustomLog` or `access_log` paths should be owned by the site user or placed in a root-owned directory readable only by log processing tools.

- Shared hosting providers ensuring one compromised site cannot read neighbors' database credentials
- Reseller hosting where resellers' clients must be isolated from each other
- Agencies hosting multiple client sites on one VPS without cross-contamination risk
- Hosting security compliance audits requiring demonstrated tenant isolation
- WordPress multisite installs where plugin code runs in a shared PHP context

| Advantage | Disadvantage |
|-----------|--------------|
| User-level isolation prevents cross-site file disclosure | Per-site PHP-FPM pools increase memory usage (one pool per site) |
| PHP-FPM + open_basedir provides defense in depth | CageFS requires CloudLinux commercial license |
| CageFS provides OS-level filesystem virtualization per tenant | Misconfigured pools (wrong user) silently break isolation |
| LVE prevents one tenant from starving others of CPU/memory | PHP open_basedir breaks applications that access files outside allowed paths |

- [Apache Virtual Host Setup](apache-virtual-host-setup.md)
- [Web Server Resource Limits](web-server-resource-limits.md)
- [Web Server Security Hardening](web-server-security-hardening.md)

---
*Part of the [Web Server Technologies](index.md) category · [Back to Master Index](../../index.md)*
