---
title: "Kubernetes scheduler algorithms"
description: "The Kubernetes scheduler selects the optimal node for each unscheduled pod using a two-phase pipeline of filtering and s"
---

**Category:** Kubernetes Infrastructure
**Difficulty:** Intermediate
**Reading time:** 6 min read

---

The Kubernetes scheduler selects the optimal node for each unscheduled pod using a two-phase pipeline of filtering and scoring. It is extensible through scheduler plugins and supports multiple scheduler profiles for workload-specific placement strategies.

- **Filtering (predicates)** — eliminates nodes that cannot satisfy hard constraints (resource requests, node selectors, taints/tolerations)
- **Scoring (priorities)** — ranks passing nodes using weighted scoring functions to find the best fit
- **Binding** — final step that writes the node assignment to the API server
- **NodeAffinity** — rules that attract pods to nodes matching specific labels
- **PodAffinity / PodAntiAffinity** — co-location or separation rules relative to other pods
- **Taints and tolerations** — mechanism to repel pods from nodes unless pods explicitly tolerate the taint
- **Scheduler framework** — plugin API with extension points (PreFilter, Filter, Score, Reserve, Bind)

```mermaid
graph LR
    A[Pending Pod] --> B[PreFilter]
    B --> C[Filter plugins]
    C --> D[PostFilter / Preemption]
    D --> E[Score plugins]
    E --> F[NormalizeScore]
    F --> G[Reserve]
    G --> H[Bind]
    style A fill:#2d5a7a,color:#fff
    style C fill:#2d5a7a,color:#fff
    style E fill:#2d5a7a,color:#fff
    style H fill:#2d5a7a,color:#fff
```

When a pod enters the `Pending` state without a node binding, the scheduler's watch picks it up and places it in a priority queue. The scheduling cycle begins by running **PreFilter** plugins that compute per-pod state shared by later plugins (e.g., computing total resource requests including init containers).

The **Filter** phase tests every node against hard constraints. Built-in filter plugins check: `NodeResourcesFit` (allocatable CPU/memory), `NodeAffinity`, `PodAffinity`, `TaintToleration`, `VolumeBinding` (available PVs), and `InterPodAffinity`. Nodes failing any filter are eliminated.

The **Score** phase assigns each remaining node a score from 0 to 100 across multiple dimensions. The `LeastAllocated` plugin favors nodes with more available resources to spread load; `ImageLocality` gives higher scores to nodes already caching the pod's container images; `NodeAffinity` scores add soft-preference weighting. Scores are multiplied by plugin weights and summed to produce a final ranked list.

**Preemption** activates when no node passes filtering. The scheduler looks for lower-priority pods that, if evicted, would free enough resources on a node. It nominates the target node, and the kubelet handles actual eviction.

Custom scheduling logic is injected via the scheduler framework's plugin interfaces. Organizations build plugins for GPU topology awareness, NUMA node packing, or tenant quota enforcement. Multiple scheduler profiles allow different scheduling policies for different workload classes within the same cluster.

- Spreading stateless replicas across failure domains using pod anti-affinity
- Pinning GPU workloads to nodes with specific hardware using node selectors
- Ensuring compliance workloads land only on certified nodes via taints
- Bin-packing batch jobs onto fewer nodes to save cost while spreading latency-sensitive services

| Advantage | Disadvantage |
|-----------|--------------|
| Two-phase pipeline is efficient even for large node counts | Complex affinity/anti-affinity rules cause exponential constraint combinations |
| Framework plugins allow arbitrarily custom scheduling logic | Custom scheduler plugins must be compiled into the scheduler binary or loaded as webhooks |
| Priority and preemption ensure critical workloads get resources | Preemption can cause cascading disruption if not combined with PodDisruptionBudgets |
| Multiple profiles support heterogeneous workload classes | Multiple schedulers for the same pod type can race and create conflicts |

- [Kubernetes control plane components](kubernetes-control-plane-components.md)
- [Pod security policies](pod-security-policies.md)
- [Namespace isolation strategies](namespace-isolation-strategies.md)

---
*Part of the [Kubernetes Infrastructure](index.md) category · [Back to Master Index](../../index.md)*
