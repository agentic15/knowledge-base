---
title: "Subpart F Income Calculation"
description: "Subpart F income is a category of CFC income that a US shareholder must include in gross income currently, regardless of"
---

**Category:** Business Intelligence & Tax Analytics
**Difficulty:** Advanced
**Reading time:** 6 min read

---

Subpart F income is a category of CFC income that a US shareholder must include in gross income currently, regardless of whether the CFC distributes dividends. Analytics platforms calculate Subpart F inclusions by categorizing CFC income into Subpart F categories, applying exclusions, and computing the US shareholder's pro-rata share across the ownership chain.

- **Subpart F income** — Categories of CFC income taxable to US shareholders currently: FPHCI, FBCI, insurance income, and others
- **Foreign Personal Holding Company Income (FPHCI)** — Passive income: dividends, interest, rents, royalties, and net gains from property
- **Foreign Base Company Sales Income (FBCI)** — Income from sales of property to or from related parties where the CFC is neither manufacturer nor seller-to-end-user
- **De minimis rule** — Subpart F income excluded if less than the lesser of 5% or $1M of CFC gross income
- **Full inclusion rule** — All CFC income is Subpart F if more than 70% is Subpart F income
- **Section 954(b)(4) high-tax exclusion** — Income taxed at more than 90% of the US rate excluded from Subpart F
- **Tested income vs Subpart F** — Income included in Subpart F is excluded from GILTI tested income to prevent double inclusion
- **Earnings and profits (E&P)** — Subpart F income cannot exceed the CFC's current E&P for the year

```mermaid
graph LR
  CFCIncome["CFC Gross Income Categories"] --> SubFTest["Subpart F Category Test"]
  SubFTest -->|FPHCI / FBCI| SubFGross["Gross Subpart F Income"]
  SubFGross -->|Allocable Expenses| NetSubF["Net Subpart F Income"]
  NetSubF -->|High-Tax Exclusion| AfterHTE["Income After HTE Exclusion"]
  AfterHTE -->|De Minimis & Full Inclusion| AdjSubF["Adjusted Subpart F Amount"]
  AdjSubF -->|US Shareholder Pro-Rata Share| Inclusion["US Shareholder Inclusion"]
  style SubFTest fill:#2d5a7a,color:#fff
  style Inclusion fill:#2d5a7a,color:#fff
```

Subpart F analytics classify each CFC's income items into categories. FPHCI is the most common: dividends received from non-related parties, interest income, rents from non-actively managed property, royalties from licensing intangibles, and net gains from disposition of property generating such income. Analytics map GL account codes to FPHCI categories, flagging intercompany transactions that may qualify for the look-through rule exception.

FBCI income arises when a CFC purchases property from a related party and sells to an unrelated party (or vice versa), or provides services in a third country. Analytics identify these flows from intercompany transaction data, testing whether the CFC is the manufacturer or primary seller.

Allocable expenses are deducted from gross Subpart F income using the expense allocation regulations. The resulting net Subpart F income is then tested against the de minimis threshold (5% of gross income or $1M, whichever is less). If below de minimis, none of the income is Subpart F. If above 70% of gross income, all income is Subpart F.

The high-tax exclusion applies if the CFC's effective foreign rate exceeds 18.9% for the Subpart F category. Analytics compute the effective rate and apply the exclusion for qualifying income items.

The US shareholder's inclusion equals the net Subpart F amount multiplied by the shareholder's ownership percentage, limited to the CFC's current E&P. Analytics compare the Subpart F amount to E&P, applying the E&P cap where necessary.

- Computing FPHCI inclusions from CFC treasury operations earning interest on intercompany loans
- Identifying FBCI exposure from CFC purchasing entities in low-tax countries
- Applying the high-tax exclusion election for Subpart F items taxed above 90% of the US rate
- Computing E&P limitations on Subpart F inclusions for CFCs with negative current E&P
- Coordinating Subpart F income exclusion from GILTI tested income across all CFC calculations

| Advantage | Disadvantage |
|-----------|--------------|
| Automated Subpart F categorization across all CFCs replaces manual analysis | Transaction-level FPHCI and FBCI classification requires detailed intercompany flow data |
| High-tax exclusion modeling identifies elections that reduce unnecessary US inclusions | Look-through rule exceptions require CFC ownership structure analysis at multiple tiers |
| E&P limitation tracking prevents overstatement of US inclusions in deficit E&P years | Interaction with GILTI requires coordinated calculation to avoid double inclusion |
| De minimis and full inclusion rule testing is fully automatable from aggregate statistics | Subpart F rules for insurance income, transportation income, and oil income require specialized analysis |

- [GILTI (Global Intangible Low-Taxed Income)](gilti-global-intangible-low-taxed-income.md)
- [FDII (Foreign-Derived Intangible Income)](fdii-foreign-derived-intangible-income.md)
- [Tax Attribute Tracking](tax-attribute-tracking.md)

---
*Part of the [Business Intelligence & Tax Analytics](index.md) category · [Back to Master Index](../../index.md)*
