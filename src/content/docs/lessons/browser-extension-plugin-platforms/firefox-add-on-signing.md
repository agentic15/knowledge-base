---
title: "Firefox Add-on Signing"
description: "Firefox requires all extensions to be cryptographically signed by Mozilla before they can be installed in release builds"
---

**Category:** Browser Extension & Plugin Platforms
**Difficulty:** Intermediate
**Reading time:** 5 min read

---

Firefox requires all extensions to be cryptographically signed by Mozilla before they can be installed in release builds, a security control introduced in Firefox 48 to prevent distribution of malicious unsigned extensions. Signing is performed automatically during the AMO submission process or via the `web-ext sign` command for unlisted extensions.

- **XPI Signing** — Mozilla adds a PKCS#7 signature to the extension's ZIP (XPI) file in a `META-INF/` directory including `mozilla.rsa`, `mozilla.sf`, and `MANIFEST.MF`
- **web-ext CLI** — Mozilla's official command-line tool for building, linting, running, and signing Firefox extensions
- **AMO Signing** — Extensions submitted to AMO receive signing automatically after passing validation; listed extensions are publicly indexed
- **Unlisted Signing** — Extensions signed without public AMO listing via AMO developer hub or `web-ext sign` API — produces a signed XPI for self-distribution
- **Signature Verification** — Firefox checks the `META-INF/mozilla.rsa` signature against Mozilla's public key on every extension install and update
- **Extension ID** — The GUID or email-format ID in `browser_specific_settings.gecko.id` that Mozilla's signing system uses to track the extension across versions
- **AMO API Key** — Authentication credential (`JWT_ISSUER` + `JWT_SECRET`) used by `web-ext sign` to authenticate with Mozilla's signing API
- **Nightly/Developer Exception** — Firefox Nightly and Developer Edition can run unsigned extensions by toggling `xpinstall.signatures.required` to false in `about:config`

```mermaid
sequenceDiagram
    participant Dev as Developer
    participant WE as web-ext CLI
    participant AMOAPI as AMO Signing API
    participant Mozilla as Mozilla CA
    Dev->>WE: web-ext sign --api-key --api-secret
    WE->>AMOAPI: Submit XPI + JWT auth
    AMOAPI->>AMOAPI: Run addons-linter validation
    AMOAPI->>Mozilla: Request signature for extension ID
    Mozilla-->>AMOAPI: PKCS#7 signature
    AMOAPI-->>WE: Return signed XPI
    WE-->>Dev: Save signed XPI file
    style AMOAPI fill:#2d5a7a,color:#fff
    style Mozilla fill:#2d5a7a,color:#fff
```

When a developer runs `web-ext sign`, the CLI packages the extension as an XPI, generates a JWT using the developer's AMO API key credentials, and POSTs the XPI to the AMO signing API endpoint (`addons.mozilla.org/api/v5/addons/`). The API runs `addons-linter` validation; if it passes, Mozilla's certificate authority generates a PKCS#7 signature over the extension's file manifest.

The signature is embedded in a `META-INF/` directory within the XPI. `MANIFEST.MF` contains SHA256 hashes of each file in the extension. `mozilla.sf` is a signed summary of the manifest. `mozilla.rsa` is the PKCS#7 signature blob containing the certificate chain back to Mozilla's root CA.

At install time, Firefox's XPI installer reads `META-INF/mozilla.rsa`, verifies the certificate chain terminates at Mozilla's embedded root certificate, then validates the file hashes in `MANIFEST.MF` against actual file contents. Any tampering with extension files after signing breaks the hash verification and Firefox refuses the install.

The extension ID in `browser_specific_settings.gecko.id` is critical: it must be consistent across all versions of an extension because Mozilla's signing system uses it to authorize updates. If the ID changes between versions, users' browsers will treat the update as a different extension.

- CI/CD pipelines using `web-ext sign` with stored AMO API keys to automatically sign release builds before publishing
- Self-hosting signed XPI files on a corporate intranet for Firefox enterprise deployment without AMO listing
- Debugging signing issues by extracting the XPI and examining `META-INF/` signature files
- Enterprise IT blocking unsigned extension installation by verifying the Firefox policy `BlockInstallSources` and `ExtensionSettings`
- Automating version bumps and re-signing in build pipelines using the AMO API's polling endpoint for async signing jobs

| Advantage | Disadvantage |
|-----------|--------------|
| Mandatory signing prevents trivial distribution of unsigned malware | All distribution channels require Mozilla involvement, even private ones |
| Automated signing via API enables CI/CD integration | API signing is asynchronous — builds must poll for the signed result |
| Consistent extension ID enables reliable over-the-air updates | Changed extension ID between releases breaks automatic user updates |
| Nightly exception lets developers test unsigned builds locally | Advising users to disable signing in about:config opens security risks |

- [Firefox Add-ons Marketplace](firefox-add-ons-marketplace.md)
- [Firefox WebExtensions API](firefox-webextensions-api.md)
- [Extension Version Management](extension-version-management.md)
- [Extension Auto-Update Mechanism](extension-auto-update-mechanism.md)

---
*Part of the [Browser Extension & Plugin Platforms](index.md) category · [Back to Master Index](../../index.md)*
