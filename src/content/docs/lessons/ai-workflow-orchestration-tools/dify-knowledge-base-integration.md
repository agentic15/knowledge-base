---
title: "Dify Knowledge Base Integration"
description: "Dify's knowledge base integration provides a managed RAG pipeline for ingesting, chunking, embedding, and retrieving doc"
---

**Category:** AI Workflow & Orchestration Tools
**Difficulty:** Intermediate
**Reading time:** 6 min read

---

Dify's knowledge base integration provides a managed RAG pipeline for ingesting, chunking, embedding, and retrieving documents within LLM applications. It abstracts the complexity of building and maintaining vector database pipelines, enabling teams to add document retrieval to AI applications through a configuration-driven interface.

- **Knowledge** — Dify's term for a collection of documents processed and stored for semantic retrieval
- **Indexing strategy** — the approach for processing documents: high quality (using LLM for contextual chunking) or economical (standard text splitting)
- **Chunk settings** — configuration parameters for text segmentation including chunk size, overlap, and custom separators
- **Retrieval mode** — the strategy for finding relevant chunks: vector search (semantic similarity), full-text search, or hybrid
- **Re-ranking** — optional post-retrieval step applying a cross-encoder model to reorder retrieved chunks by relevance
- **Segment** — Dify's term for an individual text chunk stored as a vector in the knowledge base
- **Retrieval testing** — built-in interface for testing knowledge base retrieval quality with custom queries before deployment

```mermaid
graph LR
    A[Document Upload] --> B[Text Extraction]
    B --> C[Chunking]
    C --> D[Embedding Model]
    D --> E[Vector Store]
    E --> F[Index]
    F --> G[Retrieval Query]
    G --> H[Semantic Search]
    H --> I[Re-ranking]
    I --> J[Retrieved Chunks]
    style A fill:#2d5a7a,color:#fff
    style C fill:#2d5a7a,color:#fff
    style D fill:#2d5a7a,color:#fff
    style E fill:#2d5a7a,color:#fff
    style J fill:#2d5a7a,color:#fff
```

Dify knowledge base creation begins with document ingestion. Supported formats include PDF, Word documents, Markdown, plain text, HTML, and CSV files, as well as web page URLs for online content ingestion. Multiple documents can be uploaded simultaneously to a single knowledge base, which represents a collection of related content.

The high-quality indexing strategy uses an LLM to generate contextual summaries for each chunk before embedding. This parent-document retrieval approach stores both the raw chunk for context and an LLM-generated summary for improved retrieval relevance, at the cost of higher processing time and token consumption. The economical strategy uses standard text splitting without LLM augmentation.

Chunking configuration allows setting maximum chunk size (in tokens) and chunk overlap. Overlap ensures that information spanning chunk boundaries isn't lost—a paragraph split between chunks appears in full in both adjacent chunks' context windows. Custom separators can be specified to enforce splits at logical document boundaries (headers, paragraphs) rather than arbitrary token counts.

Retrieval testing is a critical quality assurance feature: the knowledge base settings page includes a query interface where administrators test retrieval with sample questions, viewing which chunks are retrieved and their relevance scores. This direct visibility into retrieval behavior enables chunk size optimization before connecting the knowledge base to a production application.

Hybrid retrieval combines dense vector search with sparse BM25 keyword search, weighting the results according to configurable alpha parameters. This combination outperforms pure vector search on queries with specific named entities or technical terms that benefit from exact string matching.

- Building a company policy chatbot by ingesting HR documentation into a knowledge base
- Creating a product support assistant that retrieves answers from technical documentation
- Legal research tool ingesting case law and regulations for semantic retrieval
- Academic literature assistant indexing research papers for question answering
- Code documentation assistant indexing API references and code examples

| Advantage | Disadvantage |
|-----------|--------------|
| Managed ingestion pipeline eliminates custom ETL development for RAG | LLM-based indexing strategy adds API cost during document processing |
| Retrieval testing interface enables empirical quality validation before deployment | Knowledge base is a managed abstraction; advanced vector database tuning is not directly accessible |
| Hybrid retrieval improves accuracy over pure vector search for keyword-heavy queries | Document update handling requires re-ingestion rather than incremental updates for large collections |
| Multiple knowledge bases can be attached to a single app for multi-domain retrieval | Embedding model selection is limited to Dify-supported providers |

- [Dify.ai LLM App Development](dify-ai-llm-app-development.md)
- [Dify Agent Orchestration](dify-agent-orchestration.md)
- [FlowiseAI Chatflow Builder](flowiseai-chatflow-builder.md)

---
*Part of the [AI Workflow & Orchestration Tools](index.md) category · [Back to Master Index](../../index.md)*
