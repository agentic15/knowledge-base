---
title: "Kinsta Static Site Hosting"
description: "Kinsta Static Site Hosting provides free hosting for static HTML, CSS, and JavaScript sites deployed from GitHub reposit"
---

**Category:** Specialized Hosting Services
**Difficulty:** Beginner
**Reading time:** 5 min read

---

Kinsta Static Site Hosting provides free hosting for static HTML, CSS, and JavaScript sites deployed from GitHub repositories, serving them through Cloudflare's global CDN. It supports modern static site generators like Next.js, Gatsby, Astro, and Hugo with automatic CI/CD builds on git push.

- **Static Site** — A website comprising pre-built HTML files without server-side execution at request time
- **Build Command** — The command Kinsta runs to compile source files into deployable HTML/CSS/JS
- **Publish Directory** — The folder containing the built output that Kinsta serves to visitors
- **GitHub Integration** — Connecting a repository so pushes trigger automatic rebuilds and deployments
- **Cloudflare CDN** — The distribution network serving static assets globally from edge nodes
- **Custom Domain** — A user-owned domain pointed at Kinsta's static hosting infrastructure
- **Free Tier** — Kinsta's no-cost offering for static sites with standard CDN delivery

```mermaid
graph LR
    A[Git Push to GitHub] -->|Webhook| B[Kinsta Build Runner]
    B -->|Install dependencies| C[npm install]
    C -->|Build command| D[npm run build]
    D -->|Output files| E[Publish Directory]
    E -->|Deploy| F[Cloudflare CDN]
    F -->|Serve globally| G[Visitors Worldwide]
    style A fill:#2d5a7a,color:#fff
    style B fill:#2d5a7a,color:#fff
    style C fill:#2d5a7a,color:#fff
    style D fill:#2d5a7a,color:#fff
    style E fill:#2d5a7a,color:#fff
    style F fill:#2d5a7a,color:#fff
    style G fill:#2d5a7a,color:#fff
```

Kinsta Static Site Hosting connects to a GitHub repository. When code is pushed to the configured branch, GitHub sends a webhook to Kinsta's build infrastructure. Kinsta spins up a build environment, installs project dependencies using the detected package manager (npm, yarn, or pnpm), executes the configured build command, and captures the output from the publish directory.

The build output — static HTML files, CSS bundles, JavaScript chunks, and assets — is deployed to Cloudflare's edge network. Unlike server-rendered sites, every request for a static file is served directly from the nearest CDN node without any compute execution, delivering consistent sub-50ms response times globally.

Custom domains are connected by adding Kinsta's CNAME record to the domain's DNS. Free SSL certificates via Let's Encrypt are provisioned automatically. The platform supports redirects and custom headers configured via a `_redirects` file (Netlify-compatible syntax) or a `kinsta.json` configuration file in the repository root.

Environment variables can be injected at build time for frameworks that need API keys or configuration baked into static output. The dashboard shows build logs, deployment history, and the ability to roll back to any previous deployment with a single click.

Kinsta offers the static hosting tier at no cost, positioning it as an entry point to the ecosystem for developers who may later add application or database hosting.

- Documentation sites built with Docusaurus, MkDocs, or Hugo
- Marketing sites built with Next.js or Gatsby with no server-side rendering
- Portfolio and personal sites with minimal dynamic requirements
- JAMstack applications where frontend is entirely static
- Preview environments for pull requests (with branch deploys)

| Advantage | Disadvantage |
|-----------|--------------|
| Free tier with Cloudflare CDN delivery | GitHub-only source integration (no GitLab/Bitbucket) |
| Automatic CI/CD builds on git push | No server-side execution — requires separate API backends |
| Global CDN delivery without additional configuration | Build minutes limits on free tier |
| Rollback to any prior deployment | Less mature feature set than Netlify/Vercel for advanced use cases |

- [Kinsta WordPress Hosting](kinsta-wordpress-hosting.md)
- [Kinsta CDN and Edge Caching](kinsta-cdn-and-edge-caching.md)
- [Gatsby Cloud (now Netlify)](gatsby-cloud-now-netlify.md)

---
*Part of the [Specialized Hosting Services](index.md) category · [Back to Master Index](../../index.md)*
