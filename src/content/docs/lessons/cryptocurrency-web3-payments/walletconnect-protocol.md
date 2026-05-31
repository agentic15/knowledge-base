---
title: "WalletConnect Protocol"
description: "WalletConnect is an open protocol for connecting mobile wallets to desktop dApps and web applications via encrypted QR c"
---

**Category:** Cryptocurrency & Web3 Payments
**Difficulty:** Intermediate
**Reading time:** 6 min read

---

WalletConnect is an open protocol for connecting mobile wallets to desktop dApps and web applications via encrypted QR code pairing or deep links. Version 2 (now the standard) uses a relay server infrastructure and supports multi-chain sessions, making it the primary standard for mobile wallet connectivity in Web3.

- **Pairing** — initial handshake establishing a shared symmetric key between dApp and wallet via QR scan
- **Session** — authenticated connection state after pairing, containing approved accounts and chains
- **Relay server** — WalletConnect's hosted infrastructure that relays encrypted messages between dApp and wallet
- **AppKit (formerly Web3Modal)** — WalletConnect's official UI library for dApp-side wallet picker
- **CAIP-2** — chain agnostic improvement proposal for identifying chains; e.g., `eip155:1` for Ethereum mainnet
- **CAIP-10** — standard for cross-chain account identifiers combining chain ID and address
- **WalletKit** — WalletConnect SDK for wallet developers to implement the protocol on the wallet side

```mermaid
sequenceDiagram
    participant DA as dApp Frontend
    participant RS as WC Relay Server
    participant WA as Mobile Wallet App
    DA->>RS: Publish connection URI (encrypted)
    DA->>DA: Display QR code
    WA->>DA: User scans QR
    WA->>RS: Subscribe to topic
    RS->>WA: Deliver proposal
    WA->>WA: User approves chains/accounts
    WA->>RS: Session approval (encrypted)
    RS->>DA: Deliver approval
    DA-->>DA: Session established
    DA->>RS: eth_sendTransaction request
    RS->>WA: Deliver request
    WA->>WA: User approves TX
    WA->>RS: Return signed TX
    RS->>DA: Deliver response
    style RS fill:#2d5a7a,color:#fff
```

WalletConnect v2 establishes connections through a topic-based pub/sub relay system. The dApp generates a unique pairing URI containing a symmetric key and relay topic. This URI is displayed as a QR code or deep link. When the user scans it with their wallet app, both parties subscribe to the same relay topic and can exchange end-to-end encrypted messages.

The pairing leads to a session proposal: the dApp specifies required chains (via CAIP-2), required methods (e.g., `eth_sendTransaction`, `personal_sign`), and required events. The wallet displays this proposal to the user, who approves and selects which accounts to expose. On approval, the session is established with a 30-day default expiry.

Subsequent requests (transaction signing, message signing, etc.) follow the same relay path: dApp publishes an encrypted request, relay delivers it to the wallet, wallet app receives a push notification, user approves in the wallet, wallet publishes the signed response, dApp receives it. The relay server never sees plaintext — it only routes encrypted blobs between topics.

AppKit (formerly Web3Modal) is the recommended UI library for dApps, providing a wallet picker modal with WalletConnect QR, injected browser wallets (MetaMask), and social login via embedded wallets. It handles session management, chain switching, and account change events. Integration requires a project ID from cloud.walletconnect.com for relay server access.

WalletConnect v2 supports Ethereum, Solana, Cosmos, and other ecosystems through chain-agnostic CAIP standards.

- Mobile-first dApps needing wallet connection without browser extensions
- Multi-chain dApps requiring single connection across Ethereum, Polygon, and Solana
- DeFi protocol frontends supporting both MetaMask and mobile wallets uniformly
- NFT marketplaces enabling purchases from Trust Wallet, Rainbow, and Phantom
- Web3 gaming platforms connecting desktop games to mobile wallet signers

| Advantage | Disadvantage |
|-----------|--------------|
| Mobile wallet support without browser extension | Relay server dependency; WalletConnect can go offline |
| Multi-chain support via CAIP standards | QR scan UX adds friction vs. direct browser extension |
| Open protocol with 400+ wallet integrations | Session management complexity vs. injected provider |
| End-to-end encrypted relay messages | Requires WalletConnect project ID for relay access |
| AppKit provides polished out-of-box UI | Push notifications require wallet-side APNS/FCM setup |

- [Web3 Wallet Connection (MetaMask)](web3-wallet-connection-metamask.md)
- [NFT Marketplace Payment Systems](nft-marketplace-payment-systems.md)
- [DeFi Payment Integration](defi-payment-integration.md)

---
*Part of the [Cryptocurrency & Web3 Payments](index.md) category · [Back to Master Index](../../index.md)*
