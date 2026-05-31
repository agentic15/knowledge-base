---
title: "Shopify Functions Serverless"
description: "Shopify Functions is a serverless execution framework enabling developers to customize core Shopify commerce logic — dis"
---

**Category:** E-commerce Hosting Platforms
**Difficulty:** Advanced
**Reading time:** 7 min read

---

Shopify Functions is a serverless execution framework enabling developers to customize core Shopify commerce logic — discounts, payment methods, shipping, cart transforms, and order routing — using WebAssembly-compiled code running in Shopify's infrastructure with guaranteed sub-5ms execution.

- **WebAssembly (WASM)** — A binary instruction format compiled from Rust, JavaScript/TypeScript, or AssemblyScript that runs in Shopify's sandboxed Function runtime
- **Function Type** — The specific customization point a Function targets: discount, payment customization, shipping customization, cart transform, order routing
- **Input/Output Contract** — Each Function type receives a structured JSON input and must return a structured output; no side effects or external calls allowed
- **JavaScript API** — Shopify provides a JavaScript/TypeScript API for writing Functions without Rust knowledge
- **Function Extension** — A Function is packaged as an extension within a Shopify app and installed by merchants
- **Discount Combination** — Functions can implement complex stacking and mutual exclusion logic for discount codes

```mermaid
graph LR
    A[Checkout Event] --> B[Shopify Functions Runtime]
    B --> C[WASM Module Load]
    C --> D[JSON Input Injection]
    D --> E[Function Execution - max 5ms]
    E --> F[JSON Output Return]
    F --> G[Checkout State Updated]
    style A fill:#2d5a7a,color:#fff
    style B fill:#2d5a7a,color:#fff
    style C fill:#2d5a7a,color:#fff
    style D fill:#2d5a7a,color:#fff
    style E fill:#2d5a7a,color:#fff
    style F fill:#2d5a7a,color:#fff
    style G fill:#2d5a7a,color:#fff
```

Functions are developed locally using Shopify CLI, which scaffolds the project with the correct API types for the chosen function type. JavaScript/TypeScript Functions use a generated API client with typed input/output structures. Rust Functions use a Cargo-based project with the Shopify Functions crate.

The Function receives its entire input in a single JSON blob at invocation: cart lines with products and variants, customer data, applied discount codes, delivery options, and any metafields specified in the Function's configuration. This data is injected into the WASM module's memory before execution begins. The 5ms CPU time limit (not wall time) ensures Functions execute synchronously within checkout request handling without degrading TTFB.

Available Function types cover the major customization points: Discount Functions create percentage, fixed amount, or free shipping discounts based on any combination of cart data; Payment Customization Functions show, hide, reorder, or rename payment methods; Shipping Customization Functions filter and reorder delivery options; Cart Transform Functions add line items, change prices, or merge/expand bundles; Order Routing Functions assign fulfillment locations.

Functions are distributed as app extensions — they are packaged within a Shopify app and merchants install the app. The Function configuration is stored per merchant, allowing the same Function code to behave differently for different merchant configurations. Multiple Functions of the same type from different apps can be active simultaneously, executing in sequence.

- Implementing tiered discount logic (10% at $100, 20% at $200, 30% at $500)
- Hiding payment methods like COD for high-risk order criteria
- Adding custom line items for gift wrapping fees based on cart contents
- Implementing BOGO (buy one, get one) promotion mechanics
- Routing orders to warehouses based on item weight and destination zone

| Advantage | Disadvantage |
|-----------|--------------|
| 5ms guarantee ensures checkout performance is not degraded | No external network calls allowed; all data must come from input contract |
| WASM enables any language that compiles to WASM binary | Rust Functions require specialized language knowledge |
| Runs in Shopify infrastructure; no server to maintain | Debugging WASM execution is more complex than interpreted code |
| Functions can be distributed as apps in the Shopify App Store | Function types are limited to Shopify-defined customization points |

- [Shopify Plus Enterprise Features](shopify-plus-enterprise-features.md)
- [Shopify Checkout Customization](shopify-checkout-customization.md)
- [Shopify Scripts (deprecated)](shopify-scripts-deprecated-replaced-by-functions.md)

---
*Part of the [E-commerce Hosting Platforms](index.md) category · [Back to Master Index](../../index.md)*
