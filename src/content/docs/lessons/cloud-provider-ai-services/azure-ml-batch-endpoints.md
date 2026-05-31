---
title: "Azure ML Batch Endpoints"
description: "Azure ML Batch Endpoints process large datasets asynchronously by running scoring jobs against data in storage. This app"
---

**Category:** Cloud Provider AI Services
**Difficulty:** Intermediate
**Reading time:** 6 min read

---

Azure ML Batch Endpoints process large datasets asynchronously by running scoring jobs against data in storage. This approach optimizes costs for non-time-sensitive predictions and enables processing large volumes efficiently.

- **Batch Job** — asynchronous scoring operation processing multiple records
- **Input Dataset** — large collection of data points stored in Azure Storage
- **Output Location** — where predictions are written for later retrieval
- **Job Scheduling** — triggering batch jobs on-demand or on schedule
- **Parallelization** — distributing data across instances for faster processing

```mermaid
graph LR
    A["Data in Storage"] --> B["Submit Batch Job"]
    B --> C["Distribute to Instances"]
    C --> D["Parallel Scoring"]
    D --> E["Write Results"]
    E --> F["Job Complete"]
    F --> G["Retrieve Results"]
```

Batch endpoints accept large datasets stored in Azure Storage. Jobs specify input location, desired output location, and scoring configuration. Azure distributes data chunks across instances for parallel processing. Each instance scores assigned data and writes results to specified storage location. Jobs execute asynchronously, with applications checking status periodically. Upon completion, predictions are available in output location for analysis. Failed jobs can be retried automatically. Batch processing is cost-effective as compute is only active during job execution.

- Monthly customer scoring for marketing campaigns
- Large-scale model evaluation and testing
- Processing historical data for analytics
- Batch image classification on large datasets
- Feature extraction from unstructured data
- Model comparison across test sets

| Advantage | Disadvantage |
|-----------|--------------|
| Cost-effective for large-scale processing | Asynchronous pattern not suitable for real-time |
| Parallel processing handles large datasets | Results only available after job completion |
| Results stored durably in storage | Data preparation and transfer overhead |
| Flexible scheduling and job management | Longer end-to-end latency |
| No idle compute costs | Monitoring and debugging more complex |

- [Azure Machine Learning endpoints](azure-machine-learning-endpoints.md)
- [Azure ML online endpoints](azure-ml-online-endpoints.md)
- [Azure OpenAI Service](azure-openai-service.md)

---
*Part of the [Cloud Provider AI Services](../index.md) category · [Back to Master Index](../../index.md)*
