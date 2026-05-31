---
title: "Privacy Shield Framework"
description: "The EU-US Privacy Shield Framework was an adequacy mechanism that allowed US organizations to receive personal data from"
---

**Category:** Compliance & Regulations
**Difficulty:** Intermediate
**Reading time:** 5 min read

---

The EU-US Privacy Shield Framework was an adequacy mechanism that allowed US organizations to receive personal data from the EU/EEA, until it was invalidated by the Court of Justice of the EU (CJEU) in the Schrems II ruling of July 2020. Its successor, the EU-US Data Privacy Framework (DPF), was adopted in July 2023 but faces similar legal challenges.

- **Schrems II** — July 2020 CJEU ruling (Data Protection Commissioner v. Facebook Ireland) invalidating Privacy Shield due to US surveillance concerns
- **EU-US Data Privacy Framework (DPF)** — replacement adequacy decision adopted July 2023 for certified US organizations
- **DPF Certification** — self-certification by US organizations with the US Department of Commerce, reviewed annually
- **Privacy Principles** — seven DPF principles including Notice, Choice, Accountability for Onward Transfer, and Data Integrity
- **Redress Mechanism** — independent dispute resolution and Data Protection Review Court for EU individuals' complaints
- **Supplementary Principles** — additional guidance on sensitive data, journalistic exceptions, and secondary liability
- **Annual Review** — joint US-EU review process to evaluate effectiveness of the DPF

```mermaid
graph LR
    A[Safe Harbor 2000] -->|Schrems I 2015| B[Invalidated]
    B --> C[Privacy Shield 2016]
    C -->|Schrems II 2020| D[Invalidated]
    D --> E[SCCs + TIA as Primary]
    E --> F[DPF July 2023]
    F -->|Ongoing Challenges| G[Legal Uncertainty]
    style A fill:#2d5a7a,color:#fff
    style B fill:#2d5a7a,color:#fff
    style C fill:#2d5a7a,color:#fff
    style D fill:#2d5a7a,color:#fff
    style E fill:#2d5a7a,color:#fff
    style F fill:#2d5a7a,color:#fff
    style G fill:#2d5a7a,color:#fff
```

The Privacy Shield operated as a self-certification program administered by the US Department of Commerce. US companies would publicly commit to the Privacy Shield principles, which covered notice to individuals, choice regarding data use, accountability for onward transfers, security, data integrity, access rights, and recourse/enforcement. Once certified, EU personal data could flow to certified US organizations without additional transfer mechanisms.

Schrems II invalidated Privacy Shield because the CJEU found that US surveillance laws (particularly FISA Section 702 and Executive Order 12333) provided US intelligence agencies access to personal data in ways incompatible with EU fundamental rights standards, and that EU data subjects had no effective redress mechanism against US government access.

The replacement EU-US Data Privacy Framework addresses Schrems II concerns through US Executive Order 14086, which created new safeguards for US signals intelligence collection and established the Data Protection Review Court — a redress mechanism allowing EU individuals to challenge US government access to their data. The DPF allows certified US organizations to receive EU personal data without executing SCCs specifically for those transfers.

Despite the DPF's adoption, privacy advocates (including Max Schrems' NOYB organization) have indicated intent to challenge it before the CJEU, citing similar structural concerns about US surveillance. Best practice for organizations is to certify under DPF while maintaining SCCs as a parallel backup mechanism, ensuring continued data flows if the DPF is again invalidated.

- US cloud providers certifying under DPF to receive EU customer data without per-customer SCCs
- US SaaS companies using DPF certification as a selling point for EU enterprise customers
- Compliance teams assessing whether DPF certification suffices or whether SCCs remain necessary
- Organizations auditing historical Privacy Shield certifications for ongoing obligations
- Legal teams monitoring DPF litigation developments to assess framework stability

| Advantage | Disadvantage |
|-----------|--------------|
| Streamlines EU-US data transfers without per-contract SCCs | History of invalidation creates business continuity risk |
| Self-certification is faster than negotiating SCCs with each partner | Annual recertification required with DoC |
| DPF redress mechanism addresses Schrems II concerns | NOYB legal challenges create ongoing legal uncertainty |
| Widely recognized by EU data subjects and regulators | Certification does not relieve organizations of other GDPR obligations |

- [Cross-Border Data Transfers](cross-border-data-transfers.md)
- [Standard Contractual Clauses](standard-contractual-clauses.md)
- [GDPR Compliance for Hosting](gdpr-compliance-for-hosting.md)

---
*Part of the [Compliance & Regulations](index.md) category · [Back to Master Index](../../index.md)*
