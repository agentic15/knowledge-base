---
title: "Ghost Newsletter Platform"
description: "Ghost's built-in newsletter platform enables publishers to deliver site content directly to subscribers' email inboxes, "
---

**Category:** Specialized Hosting Services
**Difficulty:** Beginner
**Reading time:** 5 min read

---

Ghost's built-in newsletter platform enables publishers to deliver site content directly to subscribers' email inboxes, with email analytics, subscriber segmentation, and custom newsletter templates — all managed from the same interface used to write and publish web content.

- **Newsletter** — A named email channel subscribers opt into, separate from site membership
- **Subscriber** — A free or paid contact who has provided their email to receive newsletters
- **Email Template** — The HTML layout applied to sent newsletters, customizable per newsletter channel
- **Open Rate** — The percentage of delivered emails opened by recipients, tracked per newsletter
- **Click Rate** — The percentage of recipients who clicked at least one link in a delivered newsletter
- **Email Card** — A content block visible only in email and hidden on the web version of a post
- **Sender Reputation** — The email deliverability health metric influenced by spam complaints and bounces

```mermaid
graph LR
    A[Author Publishes Post] -->|Publish & email| B[Newsletter Engine]
    B -->|Render email template| C[HTML Email]
    C -->|Deliver via ESP| D[Subscriber Inboxes]
    D -->|Opens/clicks tracked| E[Email Analytics]
    E -->|Reported in| F[Ghost Admin Dashboard]
    style A fill:#2d5a7a,color:#fff
    style B fill:#2d5a7a,color:#fff
    style C fill:#2d5a7a,color:#fff
    style D fill:#2d5a7a,color:#fff
    style E fill:#2d5a7a,color:#fff
    style F fill:#2d5a7a,color:#fff
```

When a Ghost post is published with the "Email subscribers" option selected, Ghost renders the post content into a newsletter-formatted email using the active email template. The email template is a Handlebars-based HTML layout configuring header, footer, colors, and typography to match the publication's branding.

Ghost manages subscriber lists internally, storing opt-in confirmations and handling unsubscribe requests via one-click links automatically appended to every email. Subscribers who unsubscribe are flagged in Ghost's member management interface and excluded from future sends.

Email delivery is handled by Ghost Pro's integrated email infrastructure (Mailgun-backed) or configured with a custom Mailgun or Sendgrid account for self-hosted installations. Ghost tracks open events via a 1x1 tracking pixel and click events via URL proxying, reporting per-newsletter open rates, click rates, and unsubscribe rates.

Multiple newsletter channels allow a single Ghost site to segment audiences — readers can subscribe to a "Weekly Digest" newsletter, a "Breaking News" newsletter, or both. Each newsletter has independent subscriber lists, send cadences, and email templates.

Email-only content cards allow authors to include subscriber-exclusive content within posts — sections visible in email but not rendered on the public web page, creating value differentiation for newsletter subscribers.

- Content creators building email-first publishing strategies
- News publications delivering stories to subscriber inboxes as written
- Newsletters with web archives that want one tool for both channels
- Monetized publications using free newsletter access as a membership funnel
- Sites with multiple audience segments needing independent newsletter channels

| Advantage | Disadvantage |
|-----------|--------------|
| Newsletter and CMS integrated — single workflow to publish | Less segmentation capability than dedicated email platforms |
| Automated opt-in/unsubscribe compliance management | Advanced automation sequences not available natively |
| Multiple newsletter channels for audience segmentation | Email template customization requires Handlebars knowledge |
| Built-in open and click tracking | Deliverability depends on Ghost's shared Mailgun infrastructure |

- [Ghost Pro Managed Hosting](ghost-pro-managed-hosting.md)
- [Ghost Membership Features](ghost-membership-features.md)
- [Medium-Style Publication Hosting](medium-style-publication-hosting.md)

---
*Part of the [Specialized Hosting Services](index.md) category · [Back to Master Index](../../index.md)*
