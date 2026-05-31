---
title: "Engineering Change Management"
description: "Engineering Change Management (ECM) is the formal process for proposing, evaluating, approving, and implementing changes"
---

**Category:** Manufacturing & Supply Chain
**Difficulty:** Intermediate
**Reading time:** 6 min read

---

Engineering Change Management (ECM) is the formal process for proposing, evaluating, approving, and implementing changes to product designs, BOMs, specifications, and manufacturing processes. Uncontrolled changes are one of the most common causes of quality escapes, production disruptions, and cost overruns. Cloud-based ECM platforms automate routing, impact analysis, and activation workflows, replacing email-based change processes that lack traceability and accountability.

- **ECR (Engineering Change Request)** — Proposal to change a product, submitted by anyone; initiates the formal change process
- **ECO (Engineering Change Order)** — Approved change directive with implementation details, effectivity, and affected documents
- **Change Impact Analysis** — Assessment of how a proposed change affects product cost, inventory, production schedules, and customer shipments
- **Disposition** — Decision on what to do with existing inventory when a component is changed: use-as-is, rework, scrap, or return-to-supplier
- **Effectivity** — Control determining when a change takes effect: date-based (changes after specific date), serial-based (changes after specific unit), or lot-based
- **Deviation** — Temporary approval to use a non-conforming component or process for a limited quantity or time period
- **Red-Line Drawing** — Annotated drawing showing proposed changes before formal engineering release — used for engineering discussion
- **Change Board** — Cross-functional review body (engineering, manufacturing, quality, supply chain) approving changes with collective sign-off

```mermaid
graph LR
    A[Change Identified - Quality / Cost / Obsolescence] --> B[ECR Submitted]
    B --> C[Impact Analysis - Cost / Schedule / Inventory]
    C --> D[Change Board Review]
    D --> E[ECO Issued & Approved]
    E --> F[Design Updates - CAD / BOM]
    F --> G[Disposition Existing Inventory]
    G --> H[Manufacturing Update - Work Instructions]
    H --> I[Production Implementation at Effectivity Date]
    style A fill:#2d5a7a,color:#fff
    style B fill:#2d5a7a,color:#fff
    style C fill:#2d5a7a,color:#fff
    style D fill:#2d5a7a,color:#fff
    style E fill:#2d5a7a,color:#fff
    style F fill:#2d5a7a,color:#fff
    style G fill:#2d5a7a,color:#fff
    style H fill:#2d5a7a,color:#fff
    style I fill:#2d5a7a,color:#fff
```

Engineering changes originate from multiple sources: quality problems discovered in production or field, cost reduction initiatives, component obsolescence notifications, customer-requested modifications, or regulatory requirement changes. An ECR captures the proposed change, problem description, and preliminary rationale.

Impact analysis is the most critical and often most poorly executed step. It requires examining where the changed component appears (where-used analysis), what inventory of the old component exists and its financial value, whether tooling changes are required, which suppliers or procurement actions are affected, and what production orders in process need replanning. Digital ECM systems with PLM integration automatically generate where-used reports, inventory balances, and open order lists, compressing analysis time from days to hours.

The Change Board — a cross-functional team — reviews the impact analysis, approves the change scope, sets the disposition of existing inventory, and establishes the effectivity. Effectivity decisions have significant cost implications: "use existing inventory first" minimizes scrapped material but delays the change; "implement immediately" is faster but writes off on-hand stock.

Once approved, the ECO triggers parallel tasks: engineering updates CAD files and BOMs in PLM, manufacturing revises work instructions, procurement updates supplier specifications, and quality updates inspection criteria. Change management platforms track completion of each task before marking the change fully implemented.

Leading ECM systems include Arena PLM, PTC Windchill Change Management, Propel Commerce, and Aras Innovator. Mid-market manufacturers often use QMS platforms or lightweight tools like Monday.com with custom ECO workflows.

- Electronics manufacturers managing high ECO volume from component obsolescence and cost reduction programs
- Medical device companies requiring FDA-compliant design change documentation in the design history file
- Automotive suppliers managing engineering changes coordinated with OEM model year timing
- Aerospace companies managing configuration baselines for long-life platforms requiring decades of change traceability
- Manufacturers reducing production disruptions caused by uncontrolled ad-hoc changes

| Advantage | Disadvantage |
|-----------|--------------|
| Formal process prevents uncontrolled changes reaching production | Change board reviews create approval latency for urgent changes |
| Impact analysis prevents costly inventory scrapping and production disruption | Implementing full digital ECM requires PLM and ERP integration investment |
| Complete change history supports quality investigations and audits | Organization resistance to formal process when informal changes were acceptable |
| Automated routing reduces change cycle time vs. email-based processes | Not all changes require the same rigor; risk-based tiering adds process complexity |
| Effectivity management prevents unauthorized early implementation | Training and adoption across engineering, manufacturing, and supply chain is challenging |

- [Product Lifecycle Management](product-lifecycle-management-plm.md)
- [Bills of Materials (BOM) Management](bills-of-materials-bom-management.md)
- [Quality Management System (QMS) Hosting](quality-management-system-qms-hosting.md)

---
*Part of the [Manufacturing & Supply Chain](index.md) category · [Back to Master Index](../../index.md)*
