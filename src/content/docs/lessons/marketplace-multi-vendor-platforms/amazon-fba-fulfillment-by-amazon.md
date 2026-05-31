---
title: "Amazon FBA (Fulfillment by Amazon)"
description: "Fulfillment by Amazon (FBA) allows third-party sellers to ship inventory to Amazon's fulfillment centers, after which Am"
---

**Category:** Marketplace & Multi-vendor Platforms
**Difficulty:** Intermediate
**Reading time:** 6 min read

---

Fulfillment by Amazon (FBA) allows third-party sellers to ship inventory to Amazon's fulfillment centers, after which Amazon handles picking, packing, shipping, customer service, and returns for orders. FBA listings are eligible for Amazon Prime, dramatically improving conversion rates and Buy Box performance. The program exchanges operational simplicity and Prime access for FBA fees and loss of direct inventory control.

- **FBA Fee** — Per-unit charge covering fulfillment labor, packaging materials, and shipping; calculated on dimensions and weight
- **Storage Fee** — Monthly charge for inventory occupying space in Amazon fulfillment centers; long-term storage fees apply after 365 days
- **Stranded Inventory** — FBA inventory not associated with an active listing; generates storage fees without sales
- **Inventory Performance Index (IPI)** — Amazon score measuring sell-through rate, excess inventory, and stranded inventory; low scores trigger storage limits
- **Removal Order** — Request to return or dispose of FBA inventory; sellers pay removal fees
- **Prep Requirements** — Amazon's packaging and labeling standards for FBA shipments; errors cause check-in delays and prep fees
- **Commingling** — Amazon mixing a seller's inventory with identical units from other sellers; creates counterfeit and quality risk
- **MCF (Multi-Channel Fulfillment)** — Using FBA inventory to fulfill orders from channels other than Amazon (own website, eBay)

```mermaid
graph LR
    A[Seller Ships to Amazon FC] --> B[Amazon Receives & Stores]
    B --> C[Buyer Places Order]
    C --> D[Amazon Picks & Packs]
    D --> E[Amazon Ships - Prime Eligible]
    E --> F[Buyer Receives Order]
    F --> G[Amazon Handles Returns & CS]
    G --> H[Returned Inventory Back to FC]
    style A fill:#2d5a7a,color:#fff
    style B fill:#2d5a7a,color:#fff
    style C fill:#2d5a7a,color:#fff
    style D fill:#2d5a7a,color:#fff
    style E fill:#2d5a7a,color:#fff
    style F fill:#2d5a7a,color:#fff
    style G fill:#2d5a7a,color:#fff
    style H fill:#2d5a7a,color:#fff
```

Sellers create FBA shipments in Seller Central or via API, generating Amazon shipping labels for boxes sent to designated fulfillment centers. Amazon distributes inventory across its FC network based on predicted demand and available storage capacity. Sellers cannot choose specific FC locations.

Upon FC receipt, Amazon scans and counts inventory, updating the seller's available quantity. Any discrepancies between shipped and received quantities require reconciliation claims. Check-in times vary from hours to weeks depending on FC backlog.

When a customer orders, Amazon's fulfillment system routes the order to the nearest FC with available stock, picks and packs the item, and ships it with Amazon's carrier network. Two-day Prime shipping is available to Prime members at no additional seller cost beyond standard FBA fees.

FBA fee calculation considers unit size tier (small standard, large standard, large oversize) and weight. Accurate dimensions and weight in the product catalog are essential — Amazon may remeasure items and adjust fees. FBA Revenue Calculator enables sellers to model profitability before enrolling products.

Inventory management within FBA requires monitoring IPI scores, sell-through velocity, and storage limits during Q4 (October–December) when Amazon restricts low-IPI seller storage to protect FC capacity for high-velocity items.

Returns are processed by Amazon, who determines whether items are sellable or unfulfillable. Unfulfillable inventory must be removed or disposed of, incurring fees and writing off product cost.

- Private label sellers needing Prime eligibility without building warehouse operations
- Sellers with high-velocity SKUs benefiting from Amazon's shipping speed and reliability
- International sellers needing US fulfillment infrastructure without domestic operations
- Brands wanting Amazon to handle customer service and returns at scale
- Multichannel sellers using MCF to consolidate fulfillment for all channels

| Advantage | Disadvantage |
|-----------|--------------|
| Prime eligibility significantly improves Buy Box performance and conversion | FBA fees reduce margins; low-ASP or heavy items may be unprofitable |
| Amazon handles all fulfillment, customer service, and returns | Commingling risk exposes products to counterfeit or quality issues from other sellers |
| FC network provides fast delivery across the US improving customer experience | Inventory restrictions during Q4 peak season limit restock ability |
| MCF enables cost-efficient non-Amazon channel fulfillment | Long-term storage fees punish slow-moving inventory |
| Reduces seller operational overhead at scale | Limited visibility into specific FC locations and inventory distribution |

- [Amazon Seller Central](amazon-seller-central.md)
- [Amazon Vendor Central](amazon-vendor-central.md)
- [Multi-vendor Marketplace Platforms](multi-vendor-marketplace-platforms.md)

---
*Part of the [Marketplace & Multi-vendor Platforms](index.md) category · [Back to Master Index](../../index.md)*
