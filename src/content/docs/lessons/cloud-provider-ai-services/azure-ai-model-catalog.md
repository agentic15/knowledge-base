---
title: "Azure AI Model Catalog"
description: "Azure AI Model Catalog provides curated collection of pre-trained models and foundation models available for deployment "
---

**Category:** Cloud Provider AI Services
**Difficulty:** Intermediate
**Reading time:** 6 min read

---

Azure AI Model Catalog provides curated collection of pre-trained models and foundation models available for deployment and fine-tuning. This centralized registry simplifies model discovery and enables rapid development of AI applications.

- **Model Discovery** — browsing and comparing available models across domains
- **Model Cards** — documentation describing model capabilities, limitations, and use cases
- **Deployment Templates** — ready-made configurations for common deployment patterns
- **Licensing** — clear terms for model usage in commercial applications
- **Compatibility** — assurance of working with Azure deployment infrastructure

```mermaid
graph LR
    A["Browse Catalog"] --> B["View Model Card"]
    B --> C["Review Metrics"]
    C --> D["Select Model"]
    D --> E["Deploy Configuration"]
    E --> F["Deploy to Azure"]
    F --> G["Application Ready"]
```

The catalog organizes models by task type (classification, generation, etc.), domain (healthcare, finance, etc.), and capabilities. Each model includes detailed cards describing architecture, training data, performance benchmarks, and ethical considerations. Teams compare models side-by-side to identify best options for specific requirements. Deployment templates pre-configure infrastructure for selected models. Integration with Azure ML enables direct deployment. Model versioning tracks updates and enables pinning to specific versions.

- Discovering models for specific industry domains
- Comparing model performance for task selection
- Accelerating AI project startup
- Finding pre-trained models to fine-tune
- Exploring state-of-the-art model options
- Building proof-of-concepts rapidly

| Advantage | Disadvantage |
|-----------|--------------|
| Centralized discovery reduces research time | Limited to Azure ecosystem initially |
| Detailed model cards guide selection | Not all open-source models included |
| Ready-to-deploy configurations | Standardized deployments less flexible |
| Clear licensing and compliance info | Rapid catalog growth makes browsing harder |
| Integration with Azure services | Model support dependent on Azure commitment |

- [Azure OpenAI Service](azure-openai-service.md)
- [Azure AI Studio](azure-ai-studio.md)
- [Azure Cognitive Services](azure-cognitive-services.md)

---
*Part of the [Cloud Provider AI Services](../index.md) category · [Back to Master Index](../../index.md)*
