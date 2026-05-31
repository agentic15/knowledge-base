---
title: "WP Engine Smart Plugin Manager"
description: "WP Engine Smart Plugin Manager is an automated plugin update service that tests WordPress plugin updates on a staging en"
---

**Category:** Specialized Hosting Services
**Difficulty:** Intermediate
**Reading time:** 5 min read

---

WP Engine Smart Plugin Manager is an automated plugin update service that tests WordPress plugin updates on a staging environment using visual regression comparison before applying them to live sites, helping teams maintain plugin security patches without manual intervention.

- **Visual Regression** — Screenshot comparison between pre- and post-update states to detect visual changes
- **Update Schedule** — Configurable cadence (daily, weekly) for when Smart Plugin Manager checks and applies updates
- **Excluded Plugins** — Plugins flagged to skip automated updates due to known custom dependencies
- **Update Report** — Dashboard summary of update attempts, pass/fail status, and visual diffs
- **Safe Update** — An update confirmed passing visual regression tests and applied to production
- **Failed Update** — An update that exceeded visual change threshold, queued for manual review
- **Notification Email** — Summary delivered after each Smart Plugin Manager update run

```mermaid
graph LR
    A[Update Available] -->|Apply to staging| B[Staging Environment]
    B -->|Capture screenshots| C[Visual Baseline]
    C -->|Compare| D[Regression Test]
    D -->|Pass| E[Apply to Production]
    D -->|Fail| F[Manual Review Queue]
    E -->|Send report| G[Email Notification]
    style A fill:#2d5a7a,color:#fff
    style B fill:#2d5a7a,color:#fff
    style C fill:#2d5a7a,color:#fff
    style D fill:#2d5a7a,color:#fff
    style E fill:#2d5a7a,color:#fff
    style F fill:#2d5a7a,color:#fff
    style G fill:#2d5a7a,color:#fff
```

Smart Plugin Manager activates on a per-site basis within the WP Engine User Portal. When an update run is triggered per the configured schedule, the service first captures baseline screenshots of a crawled set of pages on the production site. It then applies available plugin updates to the linked staging environment.

After applying updates, the same pages are screenshot on staging. The pixel comparison algorithm calculates a difference score per page. Updates that introduce visual changes beyond the configured threshold fail and are held for manual review. Updates within the threshold are applied to the production site automatically during off-peak hours.

The entire process produces a report viewable in the User Portal, showing each plugin updated, the before/after screenshots, and the visual diff percentage. Plugins can be individually excluded from Smart Plugin Manager — useful for highly customized plugins or those known to trigger false positives in visual regression.

Smart Plugin Manager does not test functional regressions (JavaScript errors, form submissions, API calls) — only visual layout changes. Sites with critical functional dependencies on specific plugin versions should complement SPM with additional functional test coverage.

- Maintaining plugin security patches on client sites without manual effort
- Reducing risk of plugin updates breaking page layouts
- Generating an audit trail of all plugin updates for compliance
- Handling plugin updates during low-traffic periods automatically
- Flagging problematic plugins that consistently fail visual tests

| Advantage | Disadvantage |
|-----------|--------------|
| Automated security patch application | Visual-only testing misses functional regressions |
| Detailed diff reports per update | May generate false positives for dynamic page elements |
| Configurable exclusions for sensitive plugins | Requires staging environment to be in sync with production |
| Runs during off-peak hours | Not available on entry-level WP Engine plans |

- [WP Engine Managed WordPress](wp-engine-managed-wordpress.md)
- [Pantheon Autopilot](pantheon-autopilot.md)
- [WP Engine Local Development](wp-engine-local-development.md)

---
*Part of the [Specialized Hosting Services](index.md) category · [Back to Master Index](../../index.md)*
