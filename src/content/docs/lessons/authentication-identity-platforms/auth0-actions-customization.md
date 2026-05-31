---
title: "Auth0 Actions Customization"
description: "Auth0 Actions are serverless Node.js functions that execute at specific points in the authentication pipeline, replacing"
---

**Category:** Authentication & Identity Platforms
**Difficulty:** Advanced
**Reading time:** 6 min read

---

Auth0 Actions are serverless Node.js functions that execute at specific points in the authentication pipeline, replacing the deprecated Rules and Hooks systems. Actions enable developers to customize authentication flows — adding custom JWT claims, enforcing MFA policies, calling external APIs for authorization, blocking logins based on risk signals, and sending analytics events — without modifying application code or operating identity infrastructure. Actions are versioned, testable, and deployed through the Auth0 Dashboard or Management API.

- **Trigger** — Authentication event that causes an Action to execute; key triggers include `post-login`, `credentials-exchange`, `pre-user-registration`, `post-user-registration`, and `send-phone-message`
- **Event object** — Read-only object passed to the Action containing authentication context (user, client, request, organization, stats)
- **API object** — Writable object providing methods to modify authentication outcomes: `api.accessToken.setCustomClaim()`, `api.multifactor.enable()`, `api.access.deny()`
- **Action secrets** — Encrypted key-value pairs accessible in Action code; used to store API keys and external service credentials
- **Action modules** — NPM packages bundled with the Action; specified in the Action's `package.json`; loaded at deployment
- **Flow** — Ordered chain of Actions for a given trigger; Actions execute in sequence, each able to read outputs of previous ones
- **Deployment** — Publishing a draft Action version to the live environment; draft versions are testable before deployment
- **Test payload** — Simulated event/API objects enabling Action logic testing in the Dashboard without real authentication

```mermaid
graph LR
    AuthSuccess["Successful Authentication"] --> Trigger["Post-Login Trigger"]
    Trigger --> Action1["Action: Add Custom Claims"]
    Action1 --> Action2["Action: Enforce MFA for Admins"]
    Action2 --> Action3["Action: Log to Datadog"]
    Action3 --> TokenIssue["Issue access_token + id_token"]
    style Trigger fill:#2d5a7a,color:#fff
    style Action1 fill:#2d5a7a,color:#fff
    style Action2 fill:#2d5a7a,color:#fff
```

Actions are written in Node.js (currently targeting Node 18 LTS) and follow a consistent function signature: `exports.onExecutePostLogin = async (event, api) => { ... }`. The `event` object provides read-only authentication context; the `api` object exposes methods that modify the authentication outcome.

Custom JWT claim injection is the most common Action use case. `api.accessToken.setCustomClaim('https://my-app.com/roles', event.user.app_metadata.roles)` adds a namespaced custom claim to the access token. Custom claims must use a namespaced URL format to avoid conflicts with reserved OIDC claims.

MFA enforcement uses `api.multifactor.enable('any', {allowRememberBrowser: false})`. Conditional MFA (e.g., enforce MFA only for admin users, or only for logins from unfamiliar IP ranges) is implemented by wrapping the `enable()` call in a conditional: `if (event.user.app_metadata.is_admin) { api.multifactor.enable('any'); }`.

External API calls inside Actions use built-in `node-fetch` or bundled `axios`. Common patterns: querying an authorization service for fine-grained permissions, looking up a user's tenant membership in an application database, or checking a risk score from a fraud detection API. Total Action execution time should be under 20 seconds; the Auth0 platform enforces timeouts and logs slow Actions.

Action modules declare NPM dependencies in the Dashboard's Modules panel. Auth0 bundles the specified packages at deployment time. Sensitive values (API keys, database connection strings) are stored as Action Secrets, exposed to code via `event.secrets.MY_SECRET_KEY`, and never appear in code or logs.

- Adding RBAC claims from an external permissions service to JWTs without rebuilding the auth flow
- Enforcing step-up MFA for high-risk actions (password change, payment processing) based on `acr_values` requested by the app
- Blocking logins from sanctioned countries or disposable email domains
- Sending login events to analytics platforms for user behavior tracking
- Provisioning users in external systems (Stripe, CRM) on first login

| Advantage | Disadvantage |
|-----------|--------------|
| Versioned deployment with rollback; Actions are not live-edited | Cold starts on Action execution add 50–200ms to login latency |
| Built-in secrets management prevents credential exposure in code | External API calls inside Actions add latency and introduce reliability dependencies |
| Testable with simulated events before deployment | Node.js environment is sandboxed; native addons and file system access not available |
| Replaces Rules/Hooks with a unified, better-designed pipeline | Action execution timeout limits complex orchestration patterns |

- [Auth0 Identity Platform](auth0-identity-platform.md)
- [Auth0 Organizations](auth0-organizations.md)
- [Okta Customer Identity](okta-customer-identity.md)

---
*Part of the [Authentication & Identity Platforms](index.md) category · [Back to Master Index](../../index.md)*
