---
title: "Shopify Shipping and Fulfillment"
description: "Shopify Shipping provides integrated carrier rate calculation, label printing, and shipment tracking within the Shopify "
---

**Category:** E-commerce Hosting Platforms
**Difficulty:** Intermediate
**Reading time:** 5 min read

---

Shopify Shipping provides integrated carrier rate calculation, label printing, and shipment tracking within the Shopify admin. It connects to major carriers (USPS, UPS, DHL, Canada Post) with pre-negotiated discounts and eliminates the need for third-party shipping software for most merchants.

- **Carrier Calculated Shipping** — Real-time rate retrieval from carriers based on order weight, dimensions, and destination
- **Shopify Shipping Discounts** — Pre-negotiated reduced rates from USPS, UPS, and DHL exclusive to Shopify merchants
- **Packing Slips** — Printable order documentation for box contents generated alongside shipping labels
- **Delivery Profiles** — Rules mapping products and locations to specific shipping rates and carrier services
- **Third-Party Fulfillment (3PL)** — External warehouse providers integrated via Shopify Fulfillment API
- **Fulfillment Hold** — Pausing automatic fulfillment for orders requiring review before shipping

```mermaid
graph LR
    A[Order Placed] --> B[Fulfillment Queue]
    B --> C[Pick & Pack]
    C --> D[Shopify Shipping Label]
    D --> E{Carrier}
    E --> F[USPS / UPS / DHL]
    F --> G[Tracking Number Issued]
    G --> H[Customer Notification]
    style A fill:#2d5a7a,color:#fff
    style B fill:#2d5a7a,color:#fff
    style C fill:#2d5a7a,color:#fff
    style D fill:#2d5a7a,color:#fff
    style E fill:#2d5a7a,color:#fff
    style F fill:#2d5a7a,color:#fff
    style G fill:#2d5a7a,color:#fff
    style H fill:#2d5a7a,color:#fff
```

Shopify Shipping integrates directly into order fulfillment flow. When an order is ready to ship, merchants select a carrier service and package size within the Shopify admin; the interface displays rate options from connected carriers. Selecting a rate immediately purchases a label through Shopify's carrier accounts, with the cost deducted from Shopify Shipping balance.

Discounts are significant for small and medium merchants who would not qualify individually for commercial carrier pricing. USPS Priority Mail rates through Shopify can be 60-90% below retail counter rates. UPS and DHL integrations provide competitive rates for heavier packages and international shipments.

Delivery profiles define shipping rules per product and origin location. A merchant can configure free shipping for orders over $50, flat rate $5 for orders under $50, and carrier-calculated rates for heavy items — all within one delivery profile. Multiple profiles handle different product categories or warehouse locations with distinct carrier agreements.

Third-party logistics (3PL) integration uses the Shopify Fulfillment API to route orders to external warehouse providers. When an order is placed, Shopify sends a fulfillment request to the 3PL's system; when shipped, the 3PL returns tracking numbers that Shopify populates into the order record and customer notifications. ShipBob, ShipStation, and Fulfillment by Amazon all integrate via this API.

- Small merchants printing labels at home using Shopify Shipping discounts
- Multi-location merchants routing orders to the nearest warehouse
- Subscription box businesses with high-volume regular shipments
- International merchants using DHL for cross-border delivery
- Dropshipping merchants routing orders directly to suppliers for fulfillment

| Advantage | Disadvantage |
|-----------|--------------|
| Pre-negotiated rates benefit merchants lacking carrier volume | Shopify Shipping not available in all countries |
| Integrated label printing eliminates separate shipping software | Carrier-calculated rates require correct weight/dimension data entry |
| Automated tracking number injection improves customer experience | Limited carrier options compared to dedicated shipping software |
| Fulfillment API enables 3PL integration without custom development | Some complex shipping scenarios require third-party apps |

- [Shopify Platform Architecture](shopify-platform-architecture.md)
- [Shopify Payments Processing](shopify-payments-processing.md)
- [E-commerce Infrastructure Services - Fulfillment](../e-commerce-infrastructure-services/fulfillment-center-integration.md)

---
*Part of the [E-commerce Hosting Platforms](index.md) category · [Back to Master Index](../../index.md)*
