---
title: "Bubble API Connector"
description: "Bubble's API Connector is a built-in plugin that enables Bubble apps to communicate with external REST and GraphQL APIs "
---

**Category:** Low-Code/No-Code Platforms
**Difficulty:** Intermediate
**Reading time:** 6 min read

---

Bubble's API Connector is a built-in plugin that enables Bubble apps to communicate with external REST and GraphQL APIs without writing code. It allows developers to configure API calls visually, authenticate with external services, and use response data throughout the app.

- **API Call** — A configured HTTP request with method, URL, headers, and parameters defined in the UI
- **Authentication** — Built-in support for API Key, OAuth2, and private key authentication patterns
- **Initialize Call** — The process of making a test API call to let Bubble infer the response data structure
- **Data Type Mapping** — How Bubble maps JSON response fields to typed properties usable in the editor
- **Use as Data Source** — API calls configured to return data that can feed repeating groups or expressions
- **Use as Action** — API calls configured to be triggered from workflows (POST/PUT/DELETE operations)
- **Private vs Public** — Flag controlling whether API keys are sent from the server (private) or browser (public)
- **Dynamic Parameters** — Values passed to API calls at runtime from user inputs or database fields

```mermaid
sequenceDiagram
    participant App as Bubble App
    participant Conn as API Connector
    participant Server as Bubble Server
    participant API as External API
    App->>Conn: Trigger API action
    Conn->>Server: Route private request
    Server->>API: HTTP Request + Auth headers
    API-->>Server: JSON Response
    Server-->>Conn: Parsed data
    Conn-->>App: Mapped data types
    style Server fill:#2d5a7a,color:#fff
    style Conn fill:#2d5a7a,color:#fff
```

The API Connector is configured within Bubble's plugin settings. For each external API, developers create an API group containing one or more calls. Shared authentication headers and base URLs are defined at the group level so individual calls inherit them automatically.

Each API call specifies the HTTP method, endpoint URL, headers, and body parameters. Parameters can be marked as private (sent from Bubble's server to protect credentials) or public (sent from the browser). For authentication, the connector supports static API keys in headers, OAuth 2.0 flows, and bearer tokens.

The initialization process is critical: the developer clicks "Initialize" to execute the API call against the real endpoint. Bubble parses the JSON response and infers data types for each field. This schema is then available throughout the editor — response fields appear in dropdown menus when building expressions, conditions, or UI bindings.

Calls configured as "Data Source" appear in the data source picker for elements like repeating groups, allowing dynamic lists populated from external APIs. Calls configured as "Action" appear in the workflow action list for triggering mutations.

Pagination is handled by marking parameters as page/cursor parameters and enabling pagination settings on the call configuration.

- Fetching product data from Shopify, Stripe, or Airtable APIs
- Sending form submissions to CRM systems like HubSpot
- Integrating with payment gateways for transaction processing
- Displaying weather, maps, or financial data from public APIs
- Triggering Zapier webhooks or Make (Integromat) scenarios

| Advantage | Disadvantage |
|-----------|--------------|
| No code required for most REST API integrations | Complex authentication flows (OAuth with PKCE) can be challenging |
| Private mode keeps credentials server-side and secure | GraphQL support is limited compared to dedicated GraphQL clients |
| Initialized calls produce typed data usable across the editor | Deeply nested JSON responses require careful initialization |
| Supports dynamic parameters from app state | Rate limiting and error handling require workflow workarounds |

- [Bubble Visual Programming](bubble-visual-programming.md)
- [Bubble Plugin Ecosystem](bubble-plugin-ecosystem.md)
- [Airtable Database Platform](airtable-database-platform.md)

---
*Part of the [Low-Code/No-Code Platforms](index.md) category · [Back to Master Index](../../index.md)*
