---
title: "Shopify CLI Development Tools"
description: "Shopify CLI is the official command-line tool for developing Shopify apps, themes, and Hydrogen storefronts. It provides"
---

**Category:** E-commerce Hosting Platforms
**Difficulty:** Intermediate
**Reading time:** 5 min read

---

Shopify CLI is the official command-line tool for developing Shopify apps, themes, and Hydrogen storefronts. It provides scaffolding, local development with live preview, deployment, and environment management, integrating the Shopify development workflow into a unified command interface.

- **shopify app dev** — Starts the local app development server with ngrok tunnel for Shopify webhook delivery to localhost
- **shopify theme dev** — Starts a live preview connection between local theme files and a development store
- **shopify hydrogen dev** — Runs the Hydrogen development server with Vite HMR and Oxygen-compatible runtime simulation
- **App Scaffold** — CLI-generated starter project structure for Shopify apps with authentication, routing, and API client boilerplate
- **Environment Config** — The shopify.app.toml configuration file declaring app settings, scopes, and extensions
- **Extension CLI** — Commands for developing, previewing, and deploying Shopify app extensions (UI extensions, functions)

```mermaid
graph TD
    A[Developer Machine] --> B[shopify theme dev]
    A --> C[shopify app dev]
    A --> D[shopify hydrogen dev]
    B --> E[Dev Store Preview Sync]
    C --> F[ngrok Tunnel + Local Server]
    D --> G[Vite + Oxygen Miniflare]
    E --> H[Live Theme Preview]
    F --> I[Webhook Delivery to localhost]
    G --> J[Hydrogen Local Dev]
    style A fill:#2d5a7a,color:#fff
    style B fill:#2d5a7a,color:#fff
    style C fill:#2d5a7a,color:#fff
    style D fill:#2d5a7a,color:#fff
    style E fill:#2d5a7a,color:#fff
    style F fill:#2d5a7a,color:#fff
    style G fill:#2d5a7a,color:#fff
    style H fill:#2d5a7a,color:#fff
    style I fill:#2d5a7a,color:#fff
    style J fill:#2d5a7a,color:#fff
```

Shopify CLI authenticates with a Shopify partner or merchant account using browser-based OAuth. After authentication, CLI commands operate against the configured store or partner organization. The CLI stores credentials securely and refreshes tokens automatically.

For theme development, `shopify theme dev` establishes a bidirectional file watch and sync session. Local file changes are pushed to the development store's theme immediately; theme settings changes in the admin are optionally pulled back. The preview URL opens the development store with the local theme applied, showing live changes as files are saved.

App development uses `shopify app dev` to start the local Node.js app server and create an ngrok tunnel. Shopify requires HTTPS endpoints for webhook delivery and OAuth redirects; the ngrok tunnel provides this without SSL certificate configuration. The CLI registers the tunnel URL with the app configuration automatically during the session.

Hydrogen development uses `shopify hydrogen dev` to start a Vite dev server with Miniflare — a local implementation of the Cloudflare Workers runtime. This simulates the Oxygen production environment locally, including Workers APIs, KV storage, and environment variable access, reducing the gap between local development and edge deployment behavior.

- Setting up a new Shopify theme development project from scratch
- Developing and testing Shopify app authentication flows locally
- Building and previewing Checkout UI Extensions with live reload
- Deploying theme and app updates to production stores
- Managing multiple development store environments for different clients

| Advantage | Disadvantage |
|-----------|--------------|
| Unified CLI reduces tool sprawl across theme/app/hydrogen workflows | ngrok tunnel creates external dependency for app development |
| Live preview eliminates deploy-refresh cycle in theme development | CLI requires authentication which may expire and need re-login |
| Miniflare accurately simulates Oxygen Workers environment locally | Some Cloudflare Workers APIs have gaps in Miniflare implementation |
| App scaffolding accelerates new project setup | Generated boilerplate is opinionated; non-standard architectures require cleanup |

- [Shopify Theme Development](shopify-theme-development.md)
- [Shopify Hydrogen Headless Framework](shopify-hydrogen-headless-framework.md)
- [Shopify App Store Ecosystem](shopify-app-store-ecosystem.md)

---
*Part of the [E-commerce Hosting Platforms](index.md) category · [Back to Master Index](../../index.md)*
