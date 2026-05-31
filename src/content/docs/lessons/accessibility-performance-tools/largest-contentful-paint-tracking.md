---
title: "Largest Contentful Paint Tracking"
description: "Largest Contentful Paint (LCP) tracking measures when the largest visible content element — typically a hero image, vide"
---

**Category:** Accessibility & Performance Tools
**Difficulty:** Intermediate
**Reading time:** 6 min read

---

Largest Contentful Paint (LCP) tracking measures when the largest visible content element — typically a hero image, video poster, or large text block — finishes rendering in the viewport, serving as the primary metric for perceived load speed. A target LCP of ≤2.5 seconds is a Core Web Vital and a confirmed Google ranking factor.

- **LCP element** — the largest image, video poster frame, or block-level text element visible in the viewport at the time of measurement; it can change as the page loads
- **TTFB (Time to First Byte)** — the first sub-metric of LCP; server response latency that delays all subsequent loading
- **Resource load delay** — the time between TTFB and when the browser starts loading the LCP image resource
- **Resource load duration** — how long the LCP image itself takes to download
- **Element render delay** — time from when the resource finishes loading to when it is painted on screen; affected by main-thread blocking
- **fetchpriority="high"** — the HTML attribute that hints the browser to prioritize loading the LCP image above other resources

```mermaid
flowchart LR
    A[Navigation Start] --> B[TTFB]
    B --> C[Resource Load Delay]
    C --> D[Resource Load Duration]
    D --> E[Element Render Delay]
    E --> F[LCP Event]
    style A fill:#2d5a7a,color:#fff
    style F fill:#2d5a7a,color:#fff
    style B fill:#2d5a7a,color:#fff
```

LCP is measured via the Largest Contentful Paint API, a PerformanceObserver entry type available in Chrome and Chromium browsers. The browser updates the LCP candidate as the page loads — the first candidate may be a small thumbnail, later superseded by a large hero image. The final LCP timestamp is recorded when no new larger elements appear. The `web-vitals` library's `onLCP` callback reports the final LCP value and includes a reference to the element and its URL.

Lighthouse and WebPageTest break LCP down into its four sub-components: TTFB, resource load delay, resource load duration, and element render delay. Each sub-component indicates a different optimization target. High TTFB requires server-side improvements — CDN placement, edge caching, or server response time optimization. Resource load delay is caused by the image not being discoverable in the initial HTML (discovered late by JavaScript), which is fixed with `<link rel="preload">` for the LCP image. Resource load duration is reduced by image compression (WebP, AVIF), appropriate sizing, and CDN delivery. Element render delay is minimized by reducing main-thread blocking from JavaScript.

Google Search Console's Core Web Vitals report provides URL-level LCP field data aggregated from the Chrome User Experience Report (CrUX). This shows the percentage of real users experiencing Good (≤2.5s), Needs Improvement (2.5–4s), and Poor (>4s) LCP on each page group. The CrUX Dashboard (available via Looker Studio) enables historical trending across origin-level LCP data.

- Diagnosing an LCP of 4.2 seconds on a landing page and discovering 80% of the time is resource load delay from a hero image loaded via JavaScript
- Fixing LCP by adding `fetchpriority="high"` to the hero image tag to prioritize it in the browser's preload scanner
- Monitoring LCP regression after a CMS update introduced a new hero template that loads images via lazy JS
- Setting up `web-vitals` real-user LCP tracking in Google Analytics 4 via custom events

| Advantage | Disadvantage |
|-----------|--------------|
| Four sub-component breakdown makes root cause identification precise | LCP element can vary by device type, making one-size fixes insufficient |
| Strong correlation between LCP improvement and user-perceived speed | Background images loaded via CSS are not eligible LCP candidates |
| Field data in Search Console shows impact on real users across device mix | AMP pages and infinite scroll layouts can produce misleading LCP measurements |

- [Core Web Vitals Checker](core-web-vitals-checker.md)
- [Cumulative Layout Shift Tester](cumulative-layout-shift-tester.md)
- [WebPageTest Performance Testing](webpagetest-performance-testing.md)

---
*Part of the [Accessibility & Performance Tools](index.md) category · [Back to Master Index](../../index.md)*
