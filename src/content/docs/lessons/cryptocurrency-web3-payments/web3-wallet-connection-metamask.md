---
title: "Web3 Wallet Connection (MetaMask)"
description: "MetaMask is the dominant browser extension and mobile wallet for connecting users to Ethereum and EVM-compatible dApps. "
---

**Category:** Cryptocurrency & Web3 Payments
**Difficulty:** Intermediate
**Reading time:** 6 min read

---

MetaMask is the dominant browser extension and mobile wallet for connecting users to Ethereum and EVM-compatible dApps. Implementing wallet connection enables dApps to read user addresses, request transaction signatures, and initiate token transfers through a standardized provider API.

- **EIP-1193** — standardized JavaScript Ethereum provider API injected as `window.ethereum`
- **eth_requestAccounts** — RPC method that prompts the MetaMask popup for user approval
- **Personal Sign** — off-chain message signing used for authentication (Sign-In with Ethereum / SIWE)
- **eth_sendTransaction** — initiates a transaction requiring user approval in MetaMask
- **Chain ID** — numeric identifier distinguishing networks (1=Ethereum mainnet, 137=Polygon)
- **wallet_switchEthereumChain** — RPC method to prompt the user to switch to a specific network
- **WalletConnect** — protocol extending wallet connections to mobile wallets via QR code or deep link

```mermaid
sequenceDiagram
    participant U as User Browser
    participant MM as MetaMask Extension
    participant D as dApp Frontend
    participant B as Backend Server
    D->>MM: eth_requestAccounts
    MM->>U: Show connect popup
    U->>MM: Approve
    MM-->>D: [account address]
    D->>B: Request SIWE nonce
    B-->>D: Nonce
    D->>MM: personal_sign(message)
    MM->>U: Show sign popup
    U->>MM: Sign
    MM-->>D: signature
    D->>B: POST signature for verification
    B-->>D: JWT / session
    style MM fill:#2d5a7a,color:#fff
    style B fill:#2d5a7a,color:#fff
```

MetaMask injects the `window.ethereum` provider object into every browser tab. Calling `window.ethereum.request({ method: 'eth_requestAccounts' })` triggers the connection popup. The user approves the site, and MetaMask returns the connected wallet's addresses array. Libraries like ethers.js (`new ethers.BrowserProvider(window.ethereum)`) and wagmi wrap this low-level API into ergonomic hooks.

For authentication (as opposed to just reading the address), dApps implement Sign-In with Ethereum (SIWE / EIP-4361). The flow: backend generates a unique nonce and sends it to the frontend; frontend constructs a structured SIWE message including the domain, address, chain ID, nonce, and timestamp; MetaMask's `personal_sign` displays this message to the user for approval; the user signs; the frontend sends the signature to the backend; the backend verifies the signature recovers to the claimed address and the nonce matches. This proves address ownership without revealing private keys.

For payment flows, `eth_sendTransaction` initiates transfers. The dApp constructs the transaction object (to, value in wei, optional data field for contract calls) and requests MetaMask to sign and broadcast it. The returned transaction hash can be monitored using `eth_getTransactionReceipt` polling or a node provider webhook.

Network detection via `eth_chainId` and switching via `wallet_switchEthereumChain` handle multi-chain scenarios. If the required chain is not configured, `wallet_addEthereumChain` can prompt the user to add it.

- NFT marketplaces requiring wallet authentication and purchase flow
- DeFi protocol frontends enabling token swaps and liquidity provision
- Web3 gating for token-holder access to content or communities
- E-commerce dApps with direct on-chain checkout
- DAO voting interfaces requiring wallet-based signature submission

| Advantage | Disadvantage |
|-----------|--------------|
| `window.ethereum` available in 30M+ browsers | MetaMask unavailable on iOS Safari without deep link |
| SIWE provides phishing-resistant authentication | Users must manage seed phrase security themselves |
| EIP-1193 works across MetaMask, Coinbase Wallet, Rabby | UX friction: multiple popup approvals in payment flows |
| No backend infrastructure for wallet connection | Chain switching adds complexity for multi-chain dApps |
| ethers.js/wagmi abstract low-level RPC | MetaMask extension can be disabled or unavailable |

- [WalletConnect Protocol](walletconnect-protocol.md)
- [Ethereum Payment Integration](ethereum-payment-integration.md)
- [Smart Contract Payment Automation](smart-contract-payment-automation.md)

---
*Part of the [Cryptocurrency & Web3 Payments](index.md) category · [Back to Master Index](../../index.md)*
