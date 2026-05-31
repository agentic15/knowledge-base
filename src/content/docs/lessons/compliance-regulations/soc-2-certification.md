---
title: "SOC 2 Certification"
description: "SOC 2 (System and Organization Controls 2) is an auditing standard developed by the AICPA that evaluates how service org"
---

**Category:** Compliance & Regulations
**Difficulty:** Intermediate
**Reading time:** 6 min read

---

SOC 2 (System and Organization Controls 2) is an auditing standard developed by the AICPA that evaluates how service organizations manage customer data based on five Trust Services Criteria. It is the most widely demanded compliance certification for SaaS companies and cloud hosting providers serving enterprise customers.

- **Trust Services Criteria (TSC)** — five categories: Security, Availability, Processing Integrity, Confidentiality, and Privacy
- **Type I Report** — point-in-time assessment confirming controls are suitably designed
- **Type II Report** — period-of-time assessment (typically 6–12 months) confirming controls operate effectively
- **Common Criteria (CC)** — the Security TSC, required for all SOC 2 reports; other TSC are optional
- **CPA Firm** — independent auditor must be a licensed CPA firm; SOC 2 cannot be self-attested
- **Control Environment** — the policies, procedures, and organizational structures that form the basis of the audit
- **Exception** — auditor finding where a control did not operate as described during the audit period

```mermaid
graph LR
    A[Readiness Assessment] --> B[Gap Remediation]
    B --> C[Audit Period Begins]
    C --> D[Evidence Collection]
    D --> E[Auditor Testing]
    E --> F[Draft Report Review]
    F --> G[Final SOC 2 Report]
    G --> H[Customer Distribution]
    H --> I[Continuous Monitoring]
    I --> C
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

SOC 2 audits evaluate whether a service organization's controls meet the Trust Services Criteria over time (Type II) or at a single point (Type I). The Security TSC (Common Criteria) is mandatory and covers logical and physical access controls, change management, risk mitigation, and incident response. Organizations elect additional TSC based on their service commitments — Availability is commonly added for hosting providers, while Confidentiality is added for platforms handling sensitive business data.

The audit process typically starts with a readiness assessment comparing current controls to the criteria. Gaps are remediated before the observation period begins. During the audit period, evidence is continuously collected — access reviews, change tickets, security scan results, incident records, vendor assessments, and training completion records. Automated evidence collection platforms (Vanta, Drata, Secureframe) have become standard, connecting directly to cloud providers, HR systems, and ticketing tools to gather evidence continuously.

Auditors test a sample of controls against each criterion, looking for both design effectiveness and operational consistency. A single missed quarterly access review or undocumented change can result in an exception. The final report includes the auditor's opinion, a description of the system, management's assertion, the criteria, and descriptions of controls with any exceptions noted. SOC 2 Type II reports are typically shared under NDA with prospective enterprise customers as part of vendor security reviews.

- SaaS companies responding to enterprise customer security questionnaires
- Cloud hosting providers demonstrating operational security maturity
- Managed service providers seeking to win regulated-industry customers
- Startups building credibility with Fortune 500 procurement teams
- Organizations pursuing ISO 27001 using SOC 2 as a stepping stone

| Advantage | Disadvantage |
|-----------|--------------|
| Widely recognized by enterprise security teams | Type II audit typically costs $30,000–$100,000+ annually |
| Flexible framework adaptable to organization size | No prescriptive technical controls — scope interpretation varies |
| Type II demonstrates sustained operational discipline | Report is not public — must be shared manually under NDA |
| Accelerates enterprise sales cycles | Exceptions in the report can raise customer concerns |

- [ISO 27001 Certification](iso-27001-certification.md)
- [Compliance Audit Preparation](compliance-audit-preparation.md)
- [Access Control Compliance](access-control-compliance.md)

---
*Part of the [Compliance & Regulations](index.md) category · [Back to Master Index](../../index.md)*
