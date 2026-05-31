---
title: "Chrome Extension APIs"
description: "Chrome Extension APIs are the JavaScript interfaces that give extensions privileged access to browser internals — tabs, "
---

**Category:** Browser Extension & Plugin Platforms
**Difficulty:** Intermediate
**Reading time:** 6 min read

---

Chrome Extension APIs are the JavaScript interfaces that give extensions privileged access to browser internals — tabs, bookmarks, history, network requests, storage, and more — beyond what normal web pages can access. Each API must be declared in the manifest's permissions array before use, giving users and reviewers visibility into what capabilities an extension claims.

- **chrome.tabs** — API for querying, creating, updating, and closing browser tabs; can inject content scripts programmatically
- **chrome.storage** — Persistent key-value store with `sync` (synced to Google Account) and `local` (device-only) namespaces
- **chrome.webRequest / chrome.declarativeNetRequest** — APIs for observing or modifying HTTP(S) network requests
- **chrome.runtime** — Core messaging and lifecycle API, includes `sendMessage`, `connect`, and the `onInstalled` event
- **chrome.contextMenus** — API for adding custom entries to the browser right-click context menu
- **chrome.alarms** — Periodic or delayed event scheduling that survives service worker termination
- **chrome.identity** — OAuth 2.0 authentication flow integration with Google and other providers
- **Optional Permissions** — Permissions an extension can request at runtime rather than at install time, reducing initial permission scope

```mermaid
sequenceDiagram
    participant CS as Content Script
    participant SW as Service Worker
    participant CA as Chrome API Layer
    participant Browser as Browser Internals
    CS->>SW: chrome.runtime.sendMessage()
    SW->>CA: chrome.tabs.query()
    CA->>Browser: IPC to browser process
    Browser-->>CA: Tab list
    CA-->>SW: Promise resolved
    SW-->>CS: Response message
    style CA fill:#2d5a7a,color:#fff
```

Chrome extensions run in isolated processes. Content scripts execute in the context of web pages but communicate with the extension's service worker via the `chrome.runtime` messaging API. The service worker — the trusted extension context — is the only place most privileged APIs are callable.

When code calls `chrome.tabs.query({active: true})`, Chrome's C++ browser internals handle the request via inter-process communication (IPC), return the result to the JavaScript binding layer, and resolve the returned Promise. The extension never directly accesses browser memory; all operations are mediated through the API surface.

`chrome.storage.sync` serializes key-value data and, when the user is signed into Chrome, synchronizes it across all their devices via Google's servers with a 100KB quota. `chrome.storage.local` provides 10MB of local storage without sync.

For network interception, Manifest V3 extensions use `chrome.declarativeNetRequest` to register rule sets describing URL patterns, resource types, and actions (block, redirect, modify headers). The rules are evaluated in the browser's network stack before any extension JavaScript runs, making blocking extremely efficient.

`chrome.alarms` solves a fundamental service worker limitation: the worker terminates when idle, so `setTimeout` and `setInterval` are unreliable. Alarms survive worker termination and re-wake the worker when they fire.

- Reading active tab URL with `chrome.tabs` to provide contextual suggestions — works only with `tabs` permission
- Storing user preferences with `chrome.storage.sync` so settings roam across devices automatically
- Blocking ad-serving domains using `chrome.declarativeNetRequest` static rule sets bundled at install
- Authenticating users via Google OAuth with `chrome.identity.getAuthToken()` — no redirect page needed
- Scheduling background data syncs every 30 minutes using `chrome.alarms` that survive browser restarts

| Advantage | Disadvantage |
|-----------|--------------|
| Rich API surface covers nearly all browser behaviors | Each API permission increases user friction at install |
| Mediated IPC prevents direct memory access exploits | APIs are Chrome-specific; Firefox needs WebExtension polyfills |
| chrome.storage.sync enables cross-device settings automatically | 100KB sync storage quota is easily exhausted by large datasets |
| Optional permissions defer sensitive requests to user action | Optional permissions require runtime UI prompt, may confuse users |

- [Chrome Extension Manifest V3](chrome-extension-manifest-v3.md)
- [Extension Permissions Model](extension-permissions-model.md)
- [Extension Messaging API](extension-messaging-api.md)
- [Extension Storage API](extension-storage-api.md)

---
*Part of the [Browser Extension & Plugin Platforms](index.md) category · [Back to Master Index](../../index.md)*
