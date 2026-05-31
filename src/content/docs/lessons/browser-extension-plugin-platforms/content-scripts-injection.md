---
title: "Content Scripts Injection"
description: "Content scripts are JavaScript (and optionally CSS) files injected by the browser into web pages on behalf of an extensi"
---

**Category:** Browser Extension & Plugin Platforms
**Difficulty:** Intermediate
**Reading time:** 6 min read

---

Content scripts are JavaScript (and optionally CSS) files injected by the browser into web pages on behalf of an extension, running in an isolated JavaScript context that shares the DOM but not the global scope with page scripts. They are the primary mechanism by which extensions read and modify web page content.

- **Isolated World** — A separate JavaScript execution environment where content scripts run; page scripts cannot access extension variables and vice versa
- **Manifest Injection** — Declaring content scripts in `manifest.json` with `matches`, `js`, and `run_at` causes automatic injection on matching pages
- **Programmatic Injection** — Using `chrome.scripting.executeScript()` to inject scripts dynamically at runtime, requiring `scripting` API permission
- **run_at Timing** — Controls when injection occurs: `document_start` (before DOM), `document_end` (DOM ready), `document_idle` (after load event)
- **matches Pattern** — URL match pattern (e.g., `"https://*.example.com/*"`) controlling which pages receive the content script
- **DOM Sharing** — Content scripts can read and modify `document`, interact with DOM elements, and observe mutations via MutationObserver
- **Message Passing** — Content scripts communicate with the service worker via `chrome.runtime.sendMessage()` / `chrome.runtime.onMessage`
- **CSS Injection** — The `css` array in content_scripts definitions injects stylesheets that apply before page stylesheets when using `document_start`

```mermaid
sequenceDiagram
    participant Browser as Browser Engine
    participant Page as Web Page JS
    participant CS as Content Script
    participant SW as Service Worker
    Browser->>CS: Inject at document_end (matches pattern)
    CS->>CS: Read/modify DOM
    CS->>SW: chrome.runtime.sendMessage({data})
    SW->>SW: Process data, call Chrome APIs
    SW-->>CS: chrome.runtime.onMessage response
    CS->>Page: Modify DOM elements
    Note over CS,Page: Isolated worlds - no shared variables
    style CS fill:#2d5a7a,color:#fff
```

When the browser navigates to a URL matching a content script's `matches` pattern, it injects the declared scripts at the specified `run_at` timing. `document_start` injects before any page scripts execute — critical for ad blockers that need to intercept resources before they load. `document_end` injects after the DOM is parsed but before subresources finish loading, useful for DOM manipulation. `document_idle` waits until the page is fully loaded.

The isolated world boundary is enforced by the browser's V8 (or SpiderMonkey) engine. The content script receives its own JavaScript context with its own `window` object, prototype chain, and built-ins. `window` in the content script and `window` in the page appear to be the same object (they refer to the same underlying DOM Window), but each world has its own copy of built-in prototypes. This prevents a malicious page from overwriting `Array.prototype` or `Object.prototype` to intercept extension operations.

Content scripts can access the full DOM: read `document.querySelector()`, modify element attributes, add event listeners, and observe changes with `MutationObserver`. They cannot call Chrome extension APIs directly — those are available only in the service worker and extension pages. To invoke an API, the content script sends a message to the service worker.

Programmatic injection via `chrome.scripting.executeScript({target: {tabId}, files: ['inject.js']})` allows the extension to choose when and which tab to inject into at runtime. This requires either the `scripting` permission plus `activeTab` (for the current tab) or broad host permissions.

- Reading form values on banking pages to auto-fill password manager credentials into login fields
- Adding a translation button overlay to foreign-language web pages without modifying the server response
- Observing DOM mutations on social media feeds to apply content filters in real-time
- Injecting a custom CSS stylesheet to enforce high-contrast mode on all websites
- Extracting structured data (prices, dates) from product pages and messaging it to the service worker for processing

| Advantage | Disadvantage |
|-----------|--------------|
| Direct DOM access enables rich page modification without server involvement | Isolated world prevents direct page API calls — requires postMessage or DOM events for page↔extension communication |
| CSS injection at document_start prevents flash of unstyled content | Timing-sensitive injections can still race with dynamic page content |
| Manifest injection requires no runtime code — declarative and auditable | Programmatic injection requires managing tab IDs and permissions at runtime |
| MutationObserver enables reactive updates to dynamically rendered pages | Heavy content scripts on every page tab can impact browser performance |

- [Extension Manifest Files](extension-manifest-files.md)
- [Background Scripts Architecture](background-scripts-architecture.md)
- [Chrome Extension Security Policies](chrome-extension-security-policies.md)
- [Extension Messaging API](extension-messaging-api.md)

---
*Part of the [Browser Extension & Plugin Platforms](index.md) category · [Back to Master Index](../../index.md)*
