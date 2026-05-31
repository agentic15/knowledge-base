---
title: "Slow Query Log Analysis"
description: "Slow query log analysis identifies and prioritizes database queries that exceed performance thresholds, enabling enginee"
---

**Category:** Database Hosting
**Difficulty:** Intermediate
**Reading time:** 5 min read

---

Slow query log analysis identifies and prioritizes database queries that exceed performance thresholds, enabling engineers to focus optimization effort on the highest-impact queries. Tools like pt-query-digest, pgBadger, and commercial query analytics platforms aggregate slow log entries to surface patterns across thousands of logged queries.

- **slow_query_log** — MySQL/MariaDB configuration enabling logging of queries exceeding `long_query_time` seconds
- **log_min_duration_statement** — PostgreSQL equivalent; logs queries taking longer than the specified milliseconds
- **pt-query-digest** — Percona tool parsing MySQL slow query logs into aggregated query fingerprints with statistics
- **pgBadger** — PostgreSQL log analyzer generating HTML reports from PostgreSQL log files with query statistics
- **Query fingerprint** — normalized query pattern with literals replaced by `?` placeholders; groups similar queries together
- **P99 latency** — 99th percentile query execution time; better than average for identifying tail latency issues
- **Queries not using indexes** — `log_queries_not_using_indexes = ON` captures queries with full table scans; critical for index gap detection
- **Lock wait time** — `log_lock_waits` in MySQL logs queries waiting on locks; identifies contention hotspots

```mermaid
flowchart LR
    A[Enable Slow Query Log] --> B[Configure Threshold 0.1s]
    B --> C[Collect Logs 24 Hours]
    C --> D[pt-query-digest / pgBadger]
    D --> E[Ranked Query Report]
    E --> F[Top Query by Total Time]
    F --> G[EXPLAIN ANALYZE]
    G --> H[Add Index / Rewrite Query]
    style D fill:#2d5a7a,color:#fff
    style G fill:#2d5a7a,color:#fff
    style H fill:#2d5a7a,color:#fff
```

Slow query log configuration balances information richness against log volume. A threshold of `long_query_time = 0.1` (100ms) on a production server may generate thousands of log entries per hour on a busy database. Starting with `long_query_time = 1` (1 second) and progressively lowering it as obvious issues are resolved is a practical approach.

pt-query-digest parses MySQL slow query logs by grouping entries into query fingerprints (normalized queries with literal values replaced). For each fingerprint, it calculates: total execution time (how much aggregate server time this query consumes), call count, average and P95/P99 execution time, and total rows examined vs. rows sent (high ratio indicates unnecessary full scans). The output ranks queries by total execution time—the primary optimization priority metric.

pgBadger provides similar functionality for PostgreSQL. It parses `log_min_duration_statement` output and generates an HTML report with query frequency charts, slowest queries, lock wait analysis, and connection statistics. For production PostgreSQL, using `log_min_duration_statement = 100` with `auto_explain.log_min_duration = 100` (logging execution plans for slow queries) provides both the query text and its execution plan without requiring a separate EXPLAIN run.

After identifying top queries via slow log analysis, each is investigated using EXPLAIN ANALYZE with representative parameters. The execution plan reveals whether the slowness is due to a missing index (sequential scan on a large table), poor statistics causing the wrong join strategy, or application-level issues (N+1 queries appearing as many entries with the same fingerprint).

Commercial tools (pganalyze, Datadog APM, New Relic database insights) provide continuous slow query analysis with alerting, trend tracking, and automatic EXPLAIN plan comparison, reducing the manual workflow to a dashboard review.

- Analyzing a WooCommerce MySQL slow query log to identify the three queries responsible for 80% of database load
- Running pgBadger on PostgreSQL logs after a deployment to identify newly introduced slow queries
- Using `log_queries_not_using_indexes` to find full table scans in a growing application before they become critical
- Setting up pt-query-digest in a CI job to compare query performance between application versions
- Identifying lock wait hotspots in a high-write SaaS application using slow log lock wait analysis

| Advantage | Disadvantage |
|-----------|--------------|
| Low overhead; logging only slow queries has minimal performance impact | Threshold setting misses queries that are fast individually but expensive in aggregate (high call count) |
| pt-query-digest fingerprinting groups similar queries regardless of parameter values | Slow log analysis is reactive; queries must be slow before appearing in the log |
| pgBadger HTML reports provide accessible slow query analysis for non-DBA engineers | Very busy databases generate large log files requiring regular rotation and archiving |
| `log_queries_not_using_indexes` catches full table scans regardless of absolute duration | Some full table scans are intentional (small tables); requires manual review to filter false positives |

- [Query Optimization Techniques](query-optimization-techniques.md)
- [Database Monitoring and Profiling](database-monitoring-and-profiling.md)
- [Database Indexing Strategies](database-indexing-strategies.md)

---
*Part of the [Database Hosting](index.md) category · [Back to Master Index](../../index.md)*
