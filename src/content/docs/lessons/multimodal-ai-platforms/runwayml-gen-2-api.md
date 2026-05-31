---
title: "RunwayML Gen-2 API"
description: "Runway Gen-2 is a video generation model that creates short video clips from text prompts or images. Accessed via the Ru"
---

**Category:** Multimodal AI Platforms
**Difficulty:** Intermediate
**Reading time:** 6 min read

---

Runway Gen-2 is a video generation model that creates short video clips from text prompts or images. Accessed via the Runway API, it enables programmatic generation of 4–16 second video clips without camera or studio infrastructure. Gen-2 is widely used in creative industries for rapid concept visualization, and the API supports both text-to-video and image-to-video workflows.

- **Gen-2** — Runway's second-generation text-to-video and image-to-video model
- **Text-to-video** — generating a video clip from a descriptive text prompt alone
- **Image-to-video** — animating a static input image into a motion video clip
- **Duration** — configurable clip length (4 or 8 seconds in standard; up to 16 in Turbo)
- **Motion magnitude** — parameter controlling the degree of camera and subject movement
- **Seed** — reproducibility parameter for consistent generation across runs
- **Async job** — Runway API returns a task ID immediately; results are polled when ready

```mermaid
graph LR
    A[API Client] --> B[POST /tasks - Create Job]
    B --> C[Task ID Returned]
    C --> D[Poll GET /tasks/{id}]
    D --> E{Status?}
    E -->|Processing| D
    E -->|Complete| F[Video URL in Response]
    style A fill:#2d5a7a,color:#fff
    style B fill:#2d5a7a,color:#fff
    style F fill:#2d5a7a,color:#fff
```

The Runway API is a REST interface accessed with a Bearer token issued from the Runway dashboard. Video generation is an asynchronous operation: the client submits a `POST /tasks` request specifying the task type (`gen2`), input type (`text_to_video` or `image_to_video`), prompt, seed, duration, and motion_vector parameters. The API immediately returns a JSON object containing a `task_id` and status of `PENDING`.

The client then polls `GET /tasks/{task_id}` at intervals (typically every 5–10 seconds) until the status transitions to `SUCCEEDED`, at which point the response contains a `urls` array with presigned download links for the generated video file. Generation typically takes 30–120 seconds depending on clip length and server load.

For text-to-video, the prompt should describe scene content, camera motion, and visual style. Gen-2 interprets descriptive cinematic language well: "extreme close-up of a droplet of water falling in slow motion, studio lighting, photorealistic." For image-to-video, the source image is uploaded as a base64-encoded field and defines the visual starting frame; the prompt guides the direction of motion and action.

The `motion_vector` parameter accepts a 5×5 grid of directional vectors controlling camera movement. This enables programmable camera motions — zoom in, pan left, orbit right — independent of subject motion described in the text prompt. Setting all vectors to zero produces a "static camera" effect even when subjects animate.

- Creating product demo animations from static renders for marketing campaigns
- Producing scene prototype videos for pre-visualization in film production
- Building automated video creation pipelines for social media content at scale
- Generating concept visualization videos for pitches and presentations
- Animating illustrated characters or concept art for storytelling applications

| Advantage | Disadvantage |
|-----------|--------------|
| No video production infrastructure required | Generation takes 30–120 seconds — unsuitable for real-time use |
| Supports both text-to-video and image-to-video | Short clips (max 16 seconds) limit narrative content |
| Programmable camera motion vectors | Per-credit pricing accumulates quickly at volume |
| Strong creative community and prompt resources | Output resolution limited compared to professional video tools |

- [Runway Video Generation](runway-video-generation.md)
- [Pika Labs Video API](pika-labs-video-api.md)
- [Stable Diffusion API Hosting](stable-diffusion-api-hosting.md)

---
*Part of the [Multimodal AI Platforms](index.md) category · [Back to Master Index](../../index.md)*
