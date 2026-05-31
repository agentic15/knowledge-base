---
title: "Flannel overlay network"
description: "Flannel is one of the simplest and most widely used Kubernetes CNI plugins. It creates an overlay network that assigns e"
---

**Category:** Kubernetes Infrastructure
**Difficulty:** Beginner
**Reading time:** 5 min read

---

Flannel is one of the simplest and most widely used Kubernetes CNI plugins. It creates an overlay network that assigns each node a subnet from a larger cluster-wide CIDR and encapsulates cross-node pod traffic using VXLAN or other backends.

- **Overlay network** — wraps pod IP packets inside host-network packets to route traffic without infrastructure BGP changes
- **VXLAN backend** — Flannel's recommended mode; encapsulates pod traffic in UDP-wrapped VXLAN frames at Layer 2
- **host-gw backend** — programs direct host routes, offering better performance but requiring L2 adjacency between nodes
- **flanneld** — the Flannel daemon that distributes subnet allocations and manages the VXLAN tunnel device
- **Subnet lease** — per-node allocation stored in etcd or the Kubernetes API (with `kube-subnet-mgr`)
- **flannel.1** — the VXLAN tunnel network interface Flannel creates on each node
- **kube-flannel ConfigMap** — the configuration object that specifies the cluster network CIDR and chosen backend

```mermaid
graph LR
    P1[Pod A on Node 1] --> V1[flannel.1 VXLAN device]
    V1 -->|VXLAN encapsulation| ETH1[eth0 Node 1]
    ETH1 -->|UDP packet to Node 2| ETH2[eth0 Node 2]
    ETH2 --> V2[flannel.1 VXLAN device]
    V2 -->|Decapsulate| P2[Pod B on Node 2]
    style V1 fill:#2d5a7a,color:#fff
    style V2 fill:#2d5a7a,color:#fff
    style ETH1 fill:#2d5a7a,color:#fff
    style ETH2 fill:#2d5a7a,color:#fff
```

Flannel assigns each node a `/24` (or configurable size) subnet from the cluster's pod network CIDR (default `10.244.0.0/16`). This subnet allocation is stored centrally — originally in etcd, but modern deployments use the Kubernetes API via the `kube-subnet-mgr` flag, eliminating the need for a separate etcd cluster.

When a pod on Node 1 sends a packet to a pod on Node 2, the kernel consults the routing table and finds a route through the `flannel.1` VXLAN interface. Flannel programs this route when it learns about other nodes' subnet allocations. The VXLAN interface encapsulates the original pod IP packet inside a UDP frame destined for Node 2's host IP on port 8472. The outer packet uses host network IPs, so any standard IP network can forward it.

On Node 2, the kernel receives the UDP packet, the VXLAN driver decapsulates it to recover the original pod IP packet, and the local routing table delivers it to the destination pod.

The **host-gw backend** skips encapsulation by programming direct kernel routes pointing the remote pod CIDR at the next-hop host IP. This requires all nodes to be on the same Layer 2 segment (no routed hops between nodes), but delivers significantly better throughput because there is no packet expansion or encapsulation CPU cost.

- Simple Kubernetes clusters where ease of setup is prioritized over advanced policy
- Development and test clusters where network performance is not critical
- Environments where BGP cannot be used and VXLAN overlay is the only option
- Managed Kubernetes distributions (many use Flannel as their default CNI)

| Advantage | Disadvantage |
|-----------|--------------|
| Extremely simple to install and operate; few moving parts | No built-in NetworkPolicy enforcement; requires a separate policy plugin |
| Works on any cloud or on-prem environment without BGP requirements | VXLAN encapsulation adds overhead and reduces effective MTU by 50 bytes |
| Minimal resource footprint suitable for edge or small clusters | Feature set is limited compared to Calico or Cilium |
| Active CNCF project with broad distribution support | host-gw mode requires L2 adjacency, limiting topology flexibility |

- [Container Network Interface (CNI)](container-network-interface-cni.md)
- [Calico networking](calico-networking.md)
- [Weave Net](weave-net.md)

---
*Part of the [Kubernetes Infrastructure](index.md) category · [Back to Master Index](../../index.md)*
