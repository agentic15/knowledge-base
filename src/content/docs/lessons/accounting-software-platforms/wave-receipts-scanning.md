---
title: "Wave Receipts Scanning"
description: "Wave Receipts is the mobile receipt capture feature within the Wave app that uses OCR to extract expense data from photo"
---

**Category:** Accounting Software Platforms
**Difficulty:** Beginner
**Reading time:** 5 min read

---

Wave Receipts is the mobile receipt capture feature within the Wave app that uses OCR to extract expense data from photographed receipts, converting physical paper receipts into digital expense records in Wave Accounting. It is included in Wave's free tier as a mobile companion to the web-based accounting platform.

- **OCR (Optical Character Recognition)** — the technology that analyzes a receipt image and extracts text data including merchant name, date, total amount, and tax amounts
- **Receipt attachment** — linking a receipt image to an expense transaction in Wave as supporting documentation for the expense
- **Expense categorization** — assigning the extracted expense to a chart of accounts category for proper accounting classification
- **Mobile app** — the Wave mobile application (iOS and Android) that provides the camera-based receipt capture interface
- **Duplicate detection** — Wave's check to prevent the same receipt from being entered twice based on matching amount, date, and merchant

```mermaid
flowchart LR
    A[Photograph Receipt - Mobile] --> B[OCR Extraction]
    B --> C[Review Extracted Data]
    C --> D[Assign to Account Category]
    D --> E[Create Expense in Wave]
    E --> F[Receipt Image Attached to Transaction]
    F --> G[Available in Reports]
    style A fill:#2d5a7a,color:#fff
    style G fill:#2d5a7a,color:#fff
```

The Wave mobile app (available on iOS and Android) includes a camera interface for receipt photography. After capturing an image, Wave's OCR engine processes it and extracts the merchant name, transaction date, total amount, and subtotal/tax amounts where printed clearly on the receipt. Extraction quality depends on image sharpness, lighting, and receipt print quality — printed point-of-sale receipts extract well; hand-written or faded receipts may require manual correction.

Extracted data populates an expense entry form pre-filled with the recognized values. Users verify the data, correct any OCR errors, and assign the expense to an account category from the chart of accounts. Optionally, the expense can be assigned to a customer for billable expense reimbursement. The receipt image is stored linked to the transaction record.

The expense is posted to the Wave accounting ledger as a credit to the selected payment account (cash, credit card, or accounts payable) and a debit to the expense account. For credit card expenses, the receipt creates a pending expense that later matches to the imported bank feed transaction during reconciliation.

- Contractor photographing material receipts from the hardware store before leaving the parking lot
- Employee capturing meal and entertainment receipts for expense reimbursement reporting
- Business owner photographing fuel receipts for vehicle expense deduction tracking
- Small business creating a paperless receipt archive for year-end tax documentation

| Advantage | Disadvantage |
|-----------|--------------|
| Free receipt scanning included in Wave's zero-cost platform | OCR accuracy lower than dedicated expense tools like Expensify on complex receipts |
| Mobile capture at point of purchase prevents receipt loss | No multi-approver workflow; suitable only for owner-operated expense management |
| Receipt image preserved as digital documentation for audit purposes | Limited batch processing; receipts must be captured one at a time |

- [Wave Invoicing](wave-invoicing.md)
- [Wave Accounting Platform](wave-accounting-platform.md)
- [Xero Expenses Tracking](xero-expenses-tracking.md)

---
*Part of the [Accounting Software Platforms](index.md) category · [Back to Master Index](../../index.md)*
