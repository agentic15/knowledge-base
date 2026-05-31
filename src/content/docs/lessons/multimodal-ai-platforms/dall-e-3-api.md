---
title: "DALL-E 3 API"
description: "DALL-E 3 is OpenAI's third-generation text-to-image model, accessible via the Images API with significantly improved pro"
---

**Category:** Multimodal AI Platforms
**Difficulty:** Intermediate
**Reading time:** 6 min read

---

DALL-E 3 is OpenAI's third-generation text-to-image model, accessible via the Images API with significantly improved prompt adherence compared to DALL-E 2. It automatically enhances user prompts using GPT-4 before generation, supports 1024×1024, 1024×1792, and 1792×1024 output sizes, and produces images with coherent text rendering — a long-standing weakness in diffusion models.

- **Text-to-image generation** — creating images from natural language descriptions
- **Prompt revision** — DALL-E 3's automatic enhancement of input prompts using GPT-4
- **Image size** — supported resolutions: 1024×1024, 1024×1792, or 1792×1024 pixels
- **Style parameter** — `vivid` (cinematic, dramatic) vs `natural` (realistic, subdued) rendering style
- **Quality parameter** — `standard` vs `hd` mode enabling additional detail passes
- **Revised prompt** — the enhanced prompt actually used for generation, returned in the API response
- **Content policy** — OpenAI's restrictions on what images can be generated

```mermaid
graph LR
    A[User Text Prompt] --> B[GPT-4 Prompt Reviser]
    B --> C[Revised Prompt]
    C --> D[DALL-E 3 Diffusion Model]
    D --> E[Generated Image]
    E --> F[Content Policy Filter]
    F --> G[Image URL Response]
    style A fill:#2d5a7a,color:#fff
    style D fill:#2d5a7a,color:#fff
    style G fill:#2d5a7a,color:#fff
```

DALL-E 3 is accessed via OpenAI's Images API using the `POST /v1/images/generations` endpoint. The request specifies the `model` as `dall-e-3`, provides a text `prompt`, and optionally sets `size`, `quality`, `style`, and `n` (number of images, maximum 1 for DALL-E 3 per request).

A distinctive feature is automatic prompt revision: before generation, DALL-E 3 passes the user's prompt through an internal GPT-4 call that rewrites it to be more specific, coherent, and likely to produce high-quality output. The revised prompt is returned alongside the image URL in the API response, giving developers insight into how the model interpreted the original prompt. Developers who want to prevent revision can instruct the model in the prompt itself: "I NEED to test how the model responds to my exact prompt."

The diffusion process generates images in the selected resolution. The `hd` quality setting applies a second refinement pass, improving fine detail and texture coherence at roughly twice the cost of `standard`. The `vivid` style biases toward hyper-realistic, cinematic imagery with strong contrast; `natural` produces more realistic, less stylized results suitable for product mockups and documentary-style images.

Generated images are hosted on OpenAI's CDN and are accessible via URL for one hour. Developers must download and store images in their own storage if persistence is required. DALL-E 3 cannot edit existing images (that capability belongs to DALL-E 2's edit endpoint); it is exclusively a generation model.

- Generating product lifestyle imagery for e-commerce without photography budgets
- Creating unique illustrations for blog articles and marketing materials
- Producing concept art and design mockups for product ideation
- Generating synthetic training data for computer vision model development
- Building creative tools and consumer apps with AI image generation

| Advantage | Disadvantage |
|-----------|--------------|
| Strong prompt adherence and text rendering | Only 1 image per API call (n=1 limit) |
| Automatic prompt revision improves output quality | Cannot edit existing images — generation only |
| HD quality mode for fine-detail requirements | Generated image URLs expire after 1 hour |
| Simple API — minimal parameters to configure | Content policy restrictions limit certain creative uses |

- [DALL-E 2 API](dall-e-2-api.md)
- [Stable Diffusion API Hosting](stable-diffusion-api-hosting.md)
- [Replicate Diffusion Models](replicate-diffusion-models.md)

---
*Part of the [Multimodal AI Platforms](index.md) category · [Back to Master Index](../../index.md)*
