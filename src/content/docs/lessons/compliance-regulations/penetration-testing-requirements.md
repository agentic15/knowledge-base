---
title: "Penetration Testing Requirements"
description: "Penetration testing requirements in compliance frameworks mandate regular simulated attacks by authorized security profe"
---

**Category:** Compliance & Regulations
**Difficulty:** Advanced
**Reading time:** 6 min read

---

Penetration testing requirements in compliance frameworks mandate regular simulated attacks by authorized security professionals to identify exploitable vulnerabilities before malicious actors can. PCI DSS, SOC 2, ISO 27001, and HIPAA all reference penetration testing as a key validation mechanism for security controls, with specific scoping, methodology, and frequency requirements.

- **Penetration Test (Pen Test)** — authorized simulated attack on systems to identify and exploit security vulnerabilities
- **Scope** — defined boundaries of systems and networks included in the test; out-of-scope systems must not be touched
- **Black Box** — tester has no prior knowledge of target systems, simulating an external attacker
- **White Box** — tester has full access to documentation, source code, and architecture, enabling thorough internal assessment
- **Grey Box** — tester has limited information (e.g., standard user credentials), simulating an insider threat
- **Rules of Engagement** — pre-defined agreement specifying allowed and prohibited test activities, timing, and escalation procedures
- **Remediation Validation** — follow-up testing confirming identified vulnerabilities were successfully fixed

```mermaid
graph LR
    A[Scoping & Rules of Engagement] --> B[Reconnaissance]
    B --> C[Vulnerability Identification]
    C --> D[Exploitation Attempts]
    D --> E[Post-Exploitation]
    E --> F[Report Generation]
    F --> G[Findings Presentation]
    G --> H[Remediation]
    H --> I[Retest Validation]
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

Compliance-driven penetration testing has specific requirements that differ from ad-hoc security testing. PCI DSS Requirement 11.3 requires annual penetration testing (and after significant infrastructure changes) using an industry-accepted methodology such as PTES (Penetration Testing Execution Standard), OWASP Testing Guide for web applications, or NIST SP 800-115. The test must cover both the network layer and application layer, testing controls protecting cardholder data from both inside and outside the CDE.

For PCI DSS, internal and external penetration tests are required separately. External tests simulate an internet-based attacker; internal tests simulate a compromised system within the network. Segmentation testing is specifically required to validate that network controls are actually preventing out-of-scope systems from accessing the CDE. This is often where organizations discover unexpected network paths that bypass intended segmentation controls.

SOC 2 Trust Services Criteria include CC7.1 (Vulnerability Management) and while SOC 2 doesn't mandate specific pen test frequency, auditors typically expect annual penetration testing for Common Criteria (Security) compliance, and test reports are commonly reviewed. ISO 27001 Annex A Control 8.8 (Management of Technical Vulnerabilities) implicitly requires regular penetration testing as part of the vulnerability management program.

Test methodology should follow a structured approach: planning (scope, rules of engagement, timing), reconnaissance (passive and active information gathering), scanning (automated vulnerability identification), exploitation (manual verification of vulnerability exploitability), post-exploitation (assessing what an attacker could achieve with initial access), and reporting (findings with CVSS scores, business impact, and prioritized remediation recommendations). Critical and High findings should be remediated before the audit period closes, with documentation of remediation evidence.

- Annual PCI DSS penetration test of cardholder data environment by qualified internal resource or third party
- SOC 2 audit evidence: penetration test report demonstrating vulnerability management program maturity
- Pre-launch security assessment of new SaaS application before customer data is onboarded
- Post-major-change testing after cloud migration to validate new infrastructure security controls
- Red team exercise simulating sophisticated attacker to test detection and response capabilities

| Advantage | Disadvantage |
|-----------|--------------|
| Identifies exploitable vulnerabilities that automated scanning misses | Annual testing leaves gaps between assessments for new vulnerabilities |
| Validates effectiveness of security controls under realistic attack conditions | Qualified penetration testers are expensive ($20,000–$100,000+ per engagement) |
| Provides compliance evidence for PCI DSS, SOC 2, ISO 27001 | Tests can cause service disruption if not carefully scoped and scheduled |
| External perspective reveals blind spots in internal security reviews | Test scope limitations may exclude the most critical attack vectors |

- [Vulnerability Disclosure Policies](vulnerability-disclosure-policies.md)
- [PCI DSS Compliance](pci-dss-compliance.md)
- [Compliance Audit Preparation](compliance-audit-preparation.md)

---
*Part of the [Compliance & Regulations](index.md) category · [Back to Master Index](../../index.md)*
