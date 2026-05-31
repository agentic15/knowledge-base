---
title: "Make.com webhooks and HTTP modules"
description: "Make.com's webhook and HTTP modules enable integration with any API or service that supports HTTP requests. These module"
---

**Category:** Workflow Automation Platforms
**Difficulty:** Intermediate
**Reading time:** 6 min read

---

Make.com's webhook and HTTP modules enable integration with any API or service that supports HTTP requests. These modules provide the flexibility to connect to systems without built-in Make.com integrations.

- **Webhook Module** — Receives HTTP requests to trigger scenarios
- **HTTP Request Module** — Sends custom HTTP requests to any endpoint
- **Request Methods** — GET, POST, PUT, DELETE, and other HTTP verbs
- **Authentication Handling** — Support for various auth schemes
- **Response Processing** — Parsing and using HTTP response data

```mermaid
graph LR
    A["External Service"] -->|Webhook POST| B["Make.com Webhook"]
    B -->|Trigger| C["Scenario Logic"]
    C -->|HTTP Request| D["API Endpoint"]
    D -->|Response| E["Process Result"]
```

Webhook modules generate unique URLs that external services can POST data to, triggering scenario execution. HTTP request modules allow sending custom requests to any API endpoint with full control over headers, authentication, and request body. Responses are automatically parsed and made available to subsequent modules. This provides a universal integration mechanism for any REST API or custom endpoint.

- Integrating proprietary APIs without built-in connectors
- Building two-way webhooks between systems
- Creating custom API workflows
- Testing API functionality within scenarios
- Building microservice orchestrations

| Advantage | Disadvantage |
|-----------|--------------|
| Works with any HTTP API | Requires API knowledge |
| Maximum flexibility | More complex than pre-built modules |
| Full request control | Error handling more involved |

- [Make.com error handling](makecom-error-handling.md)
- [Make.com scenarios and modules](makecom-scenarios-and-modules.md)
- [Zapier webhooks integration](zapier-webhooks-integration.md)

---
*Part of the [Workflow Automation Platforms](workflow-automation-platforms/index.md) category · [Back to Master Index](../../index.md)*
