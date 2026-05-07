# USDC Stablecoin - Linea Network Deployment

Déploiement d'un stablecoin USDC sur le réseau Ethereum Linea avec support complet des fonctionnalités ERC20.

## 📋 Table des matières

- [Prérequis](#prérequis)
- [Installation](#installation)
- [Configuration](#configuration)
- [Déploiement](#déploiement)
- [Tests](#tests)
- [Fonctionnalités](#fonctionnalités)
- [Ressources](#ressources)

## 🛠️ Prérequis

- Node.js (v16 ou supérieur)
- npm ou yarn
- Une clé privée Ethereum avec des ETH pour les gas fees
- Compte Lineascan API (optionnel, pour vérification)

## 📦 Installation

```bash
git clone https://github.com/jores915/USDC.git
cd USDC
npm install
```

**Si vous avez une erreur d'incompatibilité de dépendances:**
```bash
npm install --legacy-peer-deps
```

## ⚙️ Configuration

### 1. Créer le fichier `.env`

```bash
cp .env.example .env
```

### 2. Éditer `.env` avec vos paramètres

```env
LINEA_RPC_URL=https://rpc.goerli.linea.build/
PRIVATE_KEY=votre_clé_privée_ici
DEPLOYER_ADDRESS=0x579862EE1f4f36028679ce5a22e19104610204D2
ETHERSCAN_API_KEY=votre_clé_api_lineascan_ici
```

**⚠️ ATTENTION:** Ne commit jamais votre `.env` (il est dans `.gitignore`)

## 🚀 Déploiement

### Testnet Linea (Recommandé d'abord)

```bash
npm run deploy:linea-testnet
```

**Output attendu:**
```
✅ USDC deployed to: 0x...
📊 Deployment info saved to: deployments/59140-....json
```

### Mainnet Linea (Après vérification sur testnet)

```bash
npm run deploy:linea-mainnet
```

## 🧪 Tests

```bash
# Exécuter les tests
npm test

# Avec rapport de gas
npm run gas-report
```

## ✨ Fonctionnalités

### ERC20 Standard
- ✅ Transfer
- ✅ TransferFrom
- ✅ Approve
- ✅ Allowance

### Fonctionnalités Avancées
- ✅ **Minting**: Créer nouveaux tokens (owner uniquement)
- ✅ **Burning**: Détruire tokens
- ✅ **Snapshots**: Historique des balances à des hauteurs de bloc spécifiques
- ✅ **Permit**: Signatures EIP-2612 pour approvals hors-chaîne
- ✅ **Ownable**: Contrôle d'accès basé sur le propriétaire

### Paramètres
| Paramètre | Valeur |
|-----------|--------|
| Nom | USD Coin |
| Symbole | USDC |
| Décimales | 6 |
| Supply Initial | 1,000,000 USDC |

## 🌐 Réseaux Configurés

### Linea Testnet (Goerli)
- **Chain ID**: 59140
- **RPC**: https://rpc.goerli.linea.build/
- **Explorer**: https://goerli.lineascan.build/
- **Faucet**: https://faucet.goerli.linea.build/

### Linea Mainnet
- **Chain ID**: 59144
- **RPC**: https://rpc.linea.build/
- **Explorer**: https://lineascan.build/

## 📝 Structure du Projet

```
USDC/
├── contracts/
│   └── USDC.sol           # Contrat principal
├── scripts/
│   └── deploy.js          # Script de déploiement
├── test/
│   └── USDC.test.js       # Tests unitaires
├── hardhat.config.js      # Configuration Hardhat
├── package.json           # Dépendances
├── .env.example           # Variables d'environnement (exemple)
└── README.md              # Cette documentation
```

## 📚 Commandes Disponibles

```bash
npm test                       # Exécuter les tests
npm run compile                # Compiler les contrats
npm run deploy:linea-testnet   # Déployer sur testnet
npm run deploy:linea-mainnet   # Déployer sur mainnet
npm run verify:testnet         # Vérifier sur testnet
npm run verify:mainnet         # Vérifier sur mainnet
npm run gas-report             # Rapport d'utilisation de gas
```

## 🔍 Vérification du Contrat

Après déploiement, vérifiez votre contrat sur Lineascan:

```bash
npm run verify:linea-testnet -- 0x... constructor_args.js
```

## 📊 Interfaces

### Mint (Owner uniquement)
```javascript
await usdc.mint(address, amount);
```

### Burn
```javascript
await usdc.burn(amount);
```

### Snapshot
```javascript
const snapshotId = await usdc.snapshot();
```

### Transfer Standard
```javascript
await usdc.transfer(to, amount);
```

## 🆘 Dépannage

### Erreur: "Cannot find module 'hardhat'"
```bash
npm install
```

### Erreur: "ethers version incompatibility"
```bash
npm install --legacy-peer-deps
```

### Gas fees trop élevés
- Utilisez d'abord le **testnet** pour développer
- Ajustez `gasPrice` dans `hardhat.config.js`
- Attendez les heures creuses

### Transaction rejetée
- Vérifiez que votre wallet a assez d'ETH
- Vérifiez que votre `PRIVATE_KEY` est correct
- Vérifiez la configuration réseau

## 📖 Ressources

- [Documentation Hardhat](https://hardhat.org/docs)
- [OpenZeppelin Contracts](https://docs.openzeppelin.com/contracts/)
- [Linea Documentation](https://docs.linea.build/)
- [ERC20 Standard](https://eips.ethereum.org/EIPS/eip-20)

## 📄 Licence

MIT License - Voir LICENSE file

## 🤝 Support

Pour des questions ou problèmes:
1. Vérifiez la documentation ci-dessus
2. Consultez les logs d'erreur complets
3. Ouvrez une issue sur GitHub

---

**Deployed on Linea Network** 🚀
