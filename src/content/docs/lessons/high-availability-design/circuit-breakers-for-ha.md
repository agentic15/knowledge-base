---
title: "Circuit Breakers for HA"
description: "Circuit breakers prevent cascading failures in distributed systems by automatically detecting unhealthy dependencies and"
---

**Category:** High Availability Design
**Difficulty:** Intermediate
**Reading time:** 6 min read

---

Circuit breakers prevent cascading failures in distributed systems by automatically detecting unhealthy dependencies and stopping calls to them during failure periods. Like an electrical circuit breaker, they interrupt the flow when conditions are dangerous, then cautiously test for recovery before resuming normal operation.

- **Circuit breaker** — software pattern that wraps dependency calls and opens (blocks) when failures exceed a threshold
- **Closed state** — normal operation; all calls pass through to the dependency
- **Open state** — circuit tripped; calls fail fast without reaching the dependency
- **Half-open state** — testing phase; limited calls allowed to probe if the dependency has recovered
- **Failure threshold** — error rate or count that triggers the circuit to open
- **Recovery timeout** — duration circuit stays open before transitioning to half-open
- **Cascading failure** — failure in one service causing overload in dependent services
- **Fail fast** — returning an error immediately rather than waiting for a timeout

```mermaid
graph LR
    CL[Closed - Normal] -->|Failures exceed threshold| O[Open - Fail Fast]
    O -->|Timeout expires| HO[Half-Open - Testing]
    HO -->|Test succeeds| CL
    HO -->|Test fails| O
    style CL fill:#2d5a7a,color:#fff
    style O fill:#2d5a7a,color:#fff
    style HO fill:#2d5a7a,color:#fff
```

A circuit breaker wraps every call to an external dependency. In the Closed state (normal operation), calls pass through. The circuit breaker tracks success and failure rates using a sliding window (e.g., last 100 requests or last 60 seconds). When the failure rate exceeds a configured threshold (e.g., 50% failures or 10 consecutive failures), the circuit transitions to Open.

In the Open state, calls to the dependency fail immediately without actually contacting the service. This fail-fast behavior prevents two harmful effects: first, it stops wasting thread/connection pool resources on a known-failing service; second, it gives the failing dependency time to recover without being bombarded with requests that would further degrade it.

After a configured timeout (e.g., 30 seconds), the circuit transitions to Half-Open. In this state, a limited number of probe requests are allowed through to the actual dependency. If these probes succeed, the circuit closes and resumes normal operation. If they fail, the circuit returns to Open for another timeout period.

Resilience4j is the leading Java library implementing circuit breakers, with configurable count-based and time-based sliding windows, success threshold for closing, and bulkhead isolation. Polly provides the same capability for .NET. Hystrix (Netflix, now in maintenance mode) popularized the pattern and is still widely deployed. Service meshes like Istio and Linkerd implement circuit breakers at the infrastructure layer, applying them without code changes to any service.

The circuit breaker pattern is most effective when combined with fallback functions—when the circuit is open, the fallback provides an alternative response rather than simply returning an error.

- Microservices calling downstream services that occasionally time out or fail
- API gateways protecting backend services from overload during degradation
- E-commerce checkout calling payment processors with open-circuit fallback to queued retry
- Service mesh circuit breakers applied transparently to all service-to-service calls
- Database connection pools using circuit breakers to prevent connection exhaustion

| Advantage | Disadvantage |
|-----------|--------------|
| Prevents cascading failures across service boundaries | Open circuit causes all requests to fail fast, impacting all users |
| Fail-fast reduces latency for users during dependency failure | Threshold tuning requires careful analysis of normal error rates |
| Allows dependencies recovery time without request bombardment | Half-open probing may allow a burst of failures before re-opening |
| Provides clear observability through circuit state metrics | Adds complexity to distributed system debugging |

- [Fallback Mechanisms](fallback-mechanisms.md)
- [Graceful Degradation](graceful-degradation.md)
- [HA Monitoring and Alerting](ha-monitoring-and-alerting.md)

---
*Part of the [High Availability Design](index.md) category · [Back to Master Index](../../index.md)*
