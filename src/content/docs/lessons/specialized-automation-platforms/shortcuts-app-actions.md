---
title: "Shortcuts App Actions"
description: "App Actions are the building blocks of Apple Shortcuts, each representing a discrete operation provided by the OS, a bui"
---

**Category:** Specialized Automation Platforms
**Difficulty:** Beginner
**Reading time:** 5 min read

---

App Actions are the building blocks of Apple Shortcuts, each representing a discrete operation provided by the OS, a built-in app, or a third-party application. The App Intents framework governs how apps expose their capabilities as actions, defining input types, parameters, and return values that make actions composable within the Shortcuts visual editor.

- **App Intent** — a Swift struct conforming to the AppIntent protocol that exposes a function as a Shortcuts action
- **Intent Parameter** — a typed input to an action that users configure or that resolves dynamically at runtime
- **Entity** — a data type (like a Playlist, Contact, or Note) that actions can receive and return
- **Perform Method** — the async Swift function that executes when an action runs in a shortcut
- **Suggested Invocation Phrase** — text Siri uses to discover and voice-activate an action
- **Action Category** — a grouping in the Shortcuts editor (e.g., Documents, Media, Web)
- **Focus Filter** — an App Intent subtype that adjusts app behavior when a Focus mode activates

```mermaid
graph LR
    A[App Developer Defines AppIntent] -->|Swift struct| B[System Intent Store]
    B -->|Available in| C[Shortcuts Editor]
    C -->|User Configures| D[Shortcut Workflow]
    D -->|Runtime Execution| E[Perform Method]
    E -->|Returns Value| F[Next Action Input]
    style A fill:#2d5a7a,color:#fff
    style B fill:#2d5a7a,color:#fff
    style C fill:#2d5a7a,color:#fff
    style D fill:#2d5a7a,color:#fff
    style E fill:#2d5a7a,color:#fff
    style F fill:#2d5a7a,color:#fff
```

When an app is installed, iOS extracts its App Intents at install time and registers them with the system's intent store—a centralized index Shortcuts queries to populate its action library. This extraction happens statically from the app bundle, so actions are available in Shortcuts even before the app has been opened.

Each AppIntent defines a `perform()` method that executes asynchronously when the action runs. This method has access to the app's data layer via standard Swift concurrency (async/await), allowing it to query databases, call internal APIs, and return structured data. The return type is typed, ensuring downstream actions receive correctly typed inputs.

Intent parameters can be static (configured once in the editor) or dynamic (resolved at runtime through an entity query). Dynamic resolution means the action can ask Siri or the user for the parameter value at execution time, enabling conversational shortcuts. Entity queries are also defined by the developer, specifying how to look up objects by identifier, filter them, and suggest them in the editor.

The older SiriKit intent system (INIntent) still works for Siri domain-specific integrations (ride booking, messaging, payments) but is largely superseded by App Intents for Shortcuts. Built-in OS actions cover calendar, contacts, files, photos, health, maps, reminders, and web, with hundreds available in the default Shortcuts library.

- Exposing "Create New Invoice" as a Shortcuts action from an accounting app
- Allowing users to set app-specific preferences via Siri voice commands
- Returning a list of recent items from a productivity app for use in downstream actions
- Implementing Focus Filters so apps adapt their content when Work Focus activates
- Enabling Widget interactions that run app intents without opening the full app

| Advantage | Disadvantage |
|-----------|--------------|
| Type-safe integration with strong developer tooling | Requires Swift/Xcode development to expose actions |
| App actions appear automatically across Siri, Shortcuts, Spotlight | Android has no equivalent unified automation framework |
| Async execution prevents UI blocking | Debugging intent registration issues can be opaque |
| Static extraction means actions load without launching app | Complex entity queries add development overhead |

- [Shortcuts (Apple) Automation](shortcuts-apple-automation.md)
- [Google Apps Script Automation](google-apps-script-automation.md)
- [IFTTT Applets and Services](ifttt-applets-and-services.md)

---
*Part of the [Specialized Automation Platforms](index.md) category · [Back to Master Index](../../index.md)*
