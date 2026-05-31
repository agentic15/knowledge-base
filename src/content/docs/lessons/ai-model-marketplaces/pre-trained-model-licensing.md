---
title: "Pre-trained Model Licensing"
description: "Pre-trained model licensing defines the legal terms under which AI model weights can be downloaded, used, modified, and "
---

**Category:** AI Model Marketplaces
**Difficulty:** Intermediate
**Reading time:** 6 min read

---

Pre-trained model licensing defines the legal terms under which AI model weights can be downloaded, used, modified, and redistributed. Unlike traditional software licenses, AI model licenses often include novel provisions around acceptable use, derived model distribution, and attribution — making understanding and compliance a critical concern for commercial AI deployments.

- **Apache 2.0** — a permissive open-source license allowing free commercial use, modification, and redistribution; used by many open models including Falcon and Gemma
- **Llama Community License** — Meta's custom license for Llama models allowing commercial use below 700M monthly active users; requires attribution and prohibits use to train competing models
- **RAIL (Responsible AI License)** — a novel license framework from BigScience/Hugging Face that permits commercial use but prohibits specific harmful applications via an acceptable use policy
- **OpenRAIL-M** — the model-specific variant of RAIL; used for models like BLOOM, adds behavioral use restrictions without being a traditional copyleft license
- **License inheritance** — when a fine-tuned model's license must be at least as restrictive as the base model's license
- **Commercial use restriction** — clauses in licenses (e.g., early Llama 2) that prohibited commercial use for companies above a specific revenue or user threshold

```mermaid
graph LR
    A[Most Restrictive] --> B[CC BY-NC\nNo commercial use]
    B --> C[Llama Community\nCommercial OK\nunder 700M MAU]
    C --> D[OpenRAIL-M\nCommercial OK\nuse restrictions]
    D --> E[Apache 2.0\nFully permissive\ncommercial use]
    E --> F[MIT\nMost permissive]
    style A fill:#7a2d2d,color:#fff
    style C fill:#7a6a2d,color:#fff
    style E fill:#3a7a4a,color:#fff
    style F fill:#2d7a2d,color:#fff
```

AI model licenses are specified in the `license` field of model cards (Hugging Face Hub uses SPDX identifiers for standard licenses; custom licenses link to a LICENSE file). Due diligence requires reading the full license text — SPDX identifiers like `llama3` indicate a custom license that must be reviewed separately.

Key license dimensions to evaluate include:
- **Commercial use**: is commercial deployment permitted?
- **Modification**: can the model be fine-tuned and redistributed?
- **Attribution**: must the base model be credited?
- **Competing products**: does the license prohibit using the model to train competing AI systems?
- **User threshold**: are there user count or revenue-based restrictions (Llama 3 community license)?

Acceptable Use Policies (AUPs), common in RAIL-based licenses and model-specific terms, list prohibited applications (weapons generation, CSAM, mass surveillance). These are contractual obligations, not technical enforcement mechanisms — compliance is the user's responsibility.

License inheritance for fine-tuned models means a fine-tune based on a CC BY-NC base cannot be commercially distributed even if the adapter data is fully owned by the fine-tuner. Organizations building commercial products must trace the license chain back to the foundational weights.

- Evaluating whether a Llama 3 fine-tuned model can be commercially deployed given the community license terms
- Checking Apache 2.0 compliance before including a model in a proprietary SaaS product
- Understanding why fine-tuning a CC BY-NC model for commercial use violates the license
- Selecting Falcon 180B (Apache 2.0) over Llama 3 when the 700M MAU threshold is a concern

| Advantage | Disadvantage |
|-----------|--------------|
| Open licenses with commercial permissions enable startups to build on powerful models affordably | Custom licenses (Llama, Gemma) require legal review; SPDX identifiers alone are insufficient |
| RAIL licenses allow commercial use while establishing ethical guardrails | Acceptable use policies are contractual, not technical; enforcement relies on self-compliance |
| Permissive licenses enable a fine-tuning economy where adapted models can be resold | License inheritance complicates derivative model distribution in multi-model pipelines |

- [Model Usage Terms](model-usage-terms.md)
- [Hugging Face Model Cards](hugging-face-model-cards.md)
- [Commercial vs Open-Source Models](commercial-vs-open-source-models.md)

---
*Part of the [AI Model Marketplaces](index.md) category · [Back to Master Index](../../index.md)*
