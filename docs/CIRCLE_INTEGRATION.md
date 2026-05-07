# 🔗 Circle USDC Integration Guide

Guide for integrating your MyUSDC with Circle's Mint credentials on Linea.

## Overview

Circle provides USDC issuance capabilities. This guide helps you:
- Integrate Circle Mint address as authorized minter
- Manage Circle credentials
- Ensure compliance with Circle requirements

## Prerequisites

1. **Circle Account** - [Sign up here](https://www.circle.com)
2. **Circle Mint Application** - Apply for Mint access
3. **Deployed MyUSDC** - Contract on Linea mainnet
4. **Admin Private Key** - To authorize Circle

## Step 1: Apply for Circle Mint

1. Go to [Circle Console](https://console.circle.com)
2. Navigate to "Developers" > "API Keys"
3. Apply for "Mint" capability
4. Complete KYC/AML verification
5. Wait for Circle approval (24-48 hours)

## Step 2: Get Circle Mint Address

Once approved by Circle:

```bash
# Access your Circle dashboard
# Navigate to: Developers > Wallets > Circle Mint Wallet
# Copy the wallet address
```

Example format:
```
CIRCLE_MINT_ADDRESS=0x1234567890123456789012345678901234567890
```

## Step 3: Configure .env

Add Circle credentials to `.env`:

```env
# Circle Mint Integration
CIRCLE_MINT_ADDRESS=0x1234567890123456789012345678901234567890
CIRCLE_API_KEY=your-circle-api-key
CIRCLE_ENTITY_SECRET=your-entity-secret
```

## Step 4: Update Contract (Optional)

To give Circle minting permissions, you can modify the contract:

```solidity
// In MyUSDC.sol constructor
function setCircleMinter(address circleMinter) external onlyAdmin {
    require(circleMinter != address(0), "Invalid address");
    // Add Circle to authorized minters
}
```

## Step 5: Authorize Circle Minter

```bash
# Create a script to add Circle as minter
cat > scripts/add-circle-minter.js << 'EOF'
require('dotenv').config();
const { ethers } = require('ethers');

const provider = new ethers.JsonRpcProvider(process.env.LINEA_RPC_URL);
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

const CONTRACT_ADDR = process.env.CONTRACT_ADDRESS;
const CIRCLE_ADDR = process.env.CIRCLE_MINT_ADDRESS;

const abi = ['function addMinter(address minter) external'];
const contract = new ethers.Contract(CONTRACT_ADDR, abi, wallet);

(async () => {
  const tx = await contract.addMinter(CIRCLE_ADDR);
  console.log('✅ Circle added as minter:', tx.hash);
  await tx.wait();
  console.log('✅ Confirmed');
})();
EOF

# Run it
node scripts/add-circle-minter.js
```

## Step 6: Use Circle's Mint API

### Using Circle API to mint:

```javascript
// Example: Mint via Circle API
const axios = require('axios');

const circleMint = async (recipient, amount) => {
  const response = await axios.post(
    'https://api.circle.com/v1/minting/mint',
    {
      idempotencyKey: generateUUID(),
      amount: amount,
      toAddress: recipient,
      chain: 'LINEA',
      beneficiary: {
        address: recipient
      }
    },
    {
      headers: {
        'Authorization': `Bearer ${process.env.CIRCLE_API_KEY}`
      }
    }
  );
  
  return response.data;
};
```

## Step 7: Monitor Circle Transactions

```bash
# Query Circle transaction status
curl -X GET https://api.circle.com/v1/minting/transactions \
  -H "Authorization: Bearer YOUR_API_KEY"
```

## Integration Workflow

```
┌─────────────────────────────┐
│  Circle Console             │
│  - API Key                  │
│  - Mint Address             │
│  - Wallet Settings          │
└──────────────┬──────────────┘
               │
               ▼
┌─────────────────────────────┐
│  MyUSDC Contract            │
│  - Admin mints via Circle   │
│  - Tracks total supply      │
│  - Manages transfers        │
└──────────────┬──────────────┘
               │
               ▼
┌─────────────────────────────┐
│  Linea Blockchain           │
│  - Transactions recorded    │
│  - On-chain verification    │
└─────────────────────────────┘
```

## Best Practices

### 1. Security
- ✅ Keep Circle API key in `.env`
- ✅ Never commit secrets
- ✅ Rotate API keys regularly
- ✅ Use IP whitelisting in Circle console

### 2. Compliance
- ✅ Follow Circle's terms of service
- ✅ Maintain audit trails
- ✅ Document all minting
- ✅ Report to Circle as required

### 3. Operations
- ✅ Monitor mint transaction status
- ✅ Reconcile with on-chain data
- ✅ Set up alerting
- ✅ Regular balance verification

### 4. Testing
- ✅ Test on Sepolia first
- ✅ Verify Circle test API
- ✅ Mock transaction flows
- ✅ Test error handling

## Troubleshooting

### "Circle Mint address not found"
- Verify Circle account has Mint approval
- Check address is correct (case-sensitive)
- Ensure KYC is complete

### "Insufficient minting permissions"
- Verify Circle Mint limit
- Check daily/monthly quotas
- Contact Circle support

### "Transaction rejected by Circle"
- Validate recipient address
- Check amount limits
- Verify compliance requirements

### "API authentication failed"
- Regenerate API key in Circle console
- Check .env file for typos
- Verify key hasn't expired

## Circle Mint Limits

Typical Circle limits (varies by account):
- Daily mint limit: $1M - $10M+
- Transaction limit: $100K - $1M+
- Account balance limit: Variable
- Transaction speed: ~30 seconds

## Advanced: Circle + MyUSDC Bridge

Create a bridge between Circle's centralized mint and your contract:

```solidity
// Pseudo-code for advanced integration
contract MyUSDCBridge {
    address public circle;
    address public myUSDC;
    
    function mintFromCircle(uint256 amount) external {
        // Receive from Circle's API
        // Transfer to recipient through MyUSDC
        IMyUSDC(myUSDC).mint(msg.sender, amount);
    }
    
    function burnToCircle(uint256 amount) external {
        // User burns MyUSDC
        // Circle redeem API called
        // Funds transferred back
    }
}
```

## Documentation Links

- [Circle Mint API](https://developers.circle.com/developer/docs/mint-api)
- [Circle Console](https://console.circle.com)
- [Circle Compliance](https://www.circle.com/compliance)
- [USDC on Linea](https://linea.mirror.xyz/)

## Support

For Circle-specific issues:
- Email: support@circle.com
- [Circle Docs](https://developers.circle.com)
- Discord: Circle community server

---

**Last Updated:** 2026-05-07  
**Integration Status:** Ready ✅  
**Network:** Linea Mainnet
