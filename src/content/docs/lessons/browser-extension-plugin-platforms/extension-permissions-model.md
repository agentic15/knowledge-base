---
title: "Extension Permissions Model"
description: "The browser extension permissions model controls which browser APIs and website origins an extension can access by requi"
---

**Category:** Browser Extension & Plugin Platforms
**Difficulty:** Intermediate
**Reading time:** 6 min read

---

The browser extension permissions model controls which browser APIs and website origins an extension can access by requiring explicit declarations in the manifest and user consent at install time. Manifest V3 introduced a stricter separation between API permissions and host permissions, improving transparency and enabling users to revoke site access granularly.

- **API Permissions** — String identifiers in the `permissions` array granting access to specific Chrome APIs (`"tabs"`, `"history"`, `"cookies"`)
- **Host Permissions** — URL match patterns in `host_permissions` granting access to specific websites for content script injection and cross-origin fetch
- **Optional Permissions** — Permissions declared in `optional_permissions` that the extension requests at runtime via `chrome.permissions.request()`, not at install
- **Permission Prompt** — The browser dialog shown at install (or when optional permissions are requested) listing the extension's data access
- **Sensitive Permissions** — Permissions that trigger prominent warnings: `<all_urls>`, `tabs`, `history`, `cookies`, `webNavigation`
- **User-Revokable Host Access** — MV3 feature allowing users to restrict an extension's host access to "On click" or "On specific sites" via the toolbar
- **activeTab** — A special permission granting temporary access to the current tab only when the user clicks the extension icon, less invasive than `<all_urls>`
- **Principle of Least Privilege** — Google's policy and best practice requiring extensions to declare only permissions genuinely needed for their functionality

```mermaid
sequenceDiagram
    participant U as User
    participant Browser as Browser
    participant Ext as Extension
    U->>Browser: Install extension
    Browser->>U: Show permission prompt (declared permissions)
    U-->>Browser: Accept or Decline
    Browser->>Ext: Extension activated with granted permissions
    Ext->>Browser: chrome.permissions.request({permissions:["bookmarks"]})
    Browser->>U: Show optional permission prompt
    U-->>Browser: Grant or Deny
    Browser-->>Ext: Callback with granted: true/false
    style Browser fill:#2d5a7a,color:#fff
```

During extension installation, the browser reads the manifest's `permissions` and `host_permissions` arrays and presents a permission prompt to the user listing what data the extension will access. The prompt uses plain-language descriptions: `<all_urls>` becomes "Read and change all your data on all websites." If the user declines, the extension is not installed (Chrome behavior) or installs without some permissions (Firefox behavior in some cases).

Optional permissions declared in `optional_permissions` are not shown at install. The extension requests them at runtime using `chrome.permissions.request({permissions: [...], origins: [...]})` which triggers an in-browser prompt. This pattern is useful for features used infrequently — asking for bookmarks permission only when the user clicks "Sync Bookmarks."

In MV3, Google introduced fine-grained host access control. After install, users can open the extension's toolbar button context menu and choose whether the extension can access websites "On all sites," "On click" (activeTab model), or "On specific sites." This user-revokable control is a departure from the all-or-nothing model of MV2.

The `activeTab` permission is a least-privilege alternative to `<all_urls>`. When declared, the extension gains access to the active tab's URL, title, favicon, and the ability to execute scripts on it — but only for the duration of the current user interaction (clicking the extension icon, activating a context menu item). No persistent host permission is granted.

Chrome's review policy flags extensions using `<all_urls>` without a clear justification. Reviewers may request switching to `activeTab` or narrower URL patterns if broad access isn't demonstrably necessary.

- Using `activeTab` instead of `<all_urls>` for an extension that only needs to read the current page when clicked
- Requesting optional `history` permission only when users enable a "History Search" feature to reduce install-time permission scope
- Building enterprise extensions with IT-manageable permissions via `chrome.permissions` queries at runtime
- Scoping `host_permissions` to `https://*.example.com/*` for an extension purpose-built for one website
- Auditing third-party extensions by reading their manifest permissions before deploying to corporate browsers

| Advantage | Disadvantage |
|-----------|--------------|
| Explicit permissions give users and IT visibility into extension capabilities | Broad permission prompts reduce install conversion rates |
| Optional permissions let users control feature-by-feature data access | Runtime permission prompts confuse non-technical users |
| activeTab minimizes persistent host access for click-triggered tools | activeTab only lasts the duration of one user gesture — not suitable for background tasks |
| User-revokable host access in MV3 gives post-install control | Extensions relying on broad host access must handle user-revoked permissions gracefully |

- [Extension Manifest Files](extension-manifest-files.md)
- [Chrome Extension Security Policies](chrome-extension-security-policies.md)
- [Chrome Extension Manifest V3](chrome-extension-manifest-v3.md)
- [Extension Privacy Policies](extension-privacy-policies.md)

---
*Part of the [Browser Extension & Plugin Platforms](index.md) category · [Back to Master Index](../../index.md)*
