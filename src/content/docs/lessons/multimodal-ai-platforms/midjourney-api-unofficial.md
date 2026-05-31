---
title: "Midjourney API (Unofficial)"
description: "Midjourney does not provide an official REST API; all interaction occurs through Discord commands. Unofficial API wrappe"
---

**Category:** Multimodal AI Platforms
**Difficulty:** Intermediate
**Reading time:** 5 min read

---

Midjourney does not provide an official REST API; all interaction occurs through Discord commands. Unofficial API wrappers automate Discord bot interactions via the Discord API or user account tokens, enabling programmatic image generation from application code. These unofficial approaches carry significant reliability and terms-of-service risks. Midjourney announced plans for an official API but availability remains limited.

- **Discord bot interaction** — the mechanism Midjourney uses for all generation commands
- **Unofficial wrapper** — a library automating Discord message sending to trigger Midjourney
- **User account token** — Discord authentication token used by unofficial bots (violates Discord ToS)
- **Bot account** — a legitimate Discord bot account alternative used by some wrapper services
- **Imagine command** — the primary Midjourney slash command (`/imagine prompt:`) for generation
- **Webhook relay** — a proxy service that receives Midjourney Discord outputs and forwards to HTTP endpoints
- **Rate limiting** — Discord API throttling that constrains generation throughput

```mermaid
graph LR
    A[Developer App] --> B[Unofficial Wrapper Service]
    B --> C[Discord API / Selenium]
    C --> D[Midjourney Bot in Discord]
    D --> E[Image Generated in Channel]
    E --> F[Webhook / Polling]
    F --> G[Image URL Returned]
    style A fill:#2d5a7a,color:#fff
    style D fill:#2d5a7a,color:#fff
    style G fill:#2d5a7a,color:#fff
```

Midjourney's image generation runs exclusively through a Discord bot. A user types `/imagine prompt: a futuristic cityscape` in a Discord channel, and the Midjourney bot processes the generation and posts the result back to the channel within 30–90 seconds. There is no official HTTP API that bypasses this Discord interaction layer.

Unofficial API wrappers operate by automating this Discord interaction. Some use Discord user account tokens to send messages programmatically — a direct violation of Discord's Terms of Service that can result in account bans. Others deploy legitimate Discord bot accounts to a server containing the Midjourney bot and relay commands through the bot account, operating in a gray area. A third approach uses headless browser automation (Puppeteer/Playwright) to interact with the Discord web interface.

Several commercial API services (GoAPI, Midjourney-proxy) offer hosted versions of these unofficial approaches, providing a REST endpoint that internally handles the Discord interaction and returns image URLs when generation completes. These services charge per-image fees or monthly subscriptions and absorb the complexity of managing Discord connections and rate limits.

Generation throughput is inherently constrained by Discord's rate limits and Midjourney's concurrent generation limits per subscription tier. The Fast mode queue allows limited concurrent generations; Turbo mode increases speed at higher credit cost; Relaxed mode queues generation at no additional credit cost but with unpredictable latency.

- Prototyping applications using Midjourney quality before an official API is available
- Automating Midjourney generation for personal projects where ToS risk is acceptable
- Building internal tools that batch-generate brand concept images through commercial relay APIs
- Testing Midjourney output quality against DALL-E 3 and Stability AI for creative projects
- Delegating generation to a managed relay service that handles Discord connection reliability

| Advantage | Disadvantage |
|-----------|--------------|
| Access to Midjourney's distinctive artistic quality | No official API — high instability risk from Discord changes |
| Commercial relay services abstract Discord complexity | Terms of Service violation risk for account-token approaches |
| Available today without waiting for official API | Rate limiting severely constrains throughput |
| Familiar REST interface via relay services | Relay services add cost on top of Midjourney subscription |

- [DALL-E 3 API](dall-e-3-api.md)
- [Stability.ai API](stability-ai-api.md)
- [Leonardo.ai API](leonardo-ai-api.md)

---
*Part of the [Multimodal AI Platforms](index.md) category · [Back to Master Index](../../index.md)*
