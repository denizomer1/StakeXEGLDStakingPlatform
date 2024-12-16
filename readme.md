# StakeX: EGLD Staking Platform

## Overview
StakeX is a decentralized staking platform built on the MultiversX blockchain, allowing users to stake EGLD tokens and earn rewards.

## Features
- EGLD Token Staking
- Dynamic Reward Calculation
- Wallet Integration
- Claim and Unstake Functionality

## Prerequisites
- Rust
- MultiversX SDK
- Node.js
- MultiversX Web Wallet

## Installation

### Smart Contract
```bash
# Clone the repository
git clone https://github.com/denizomer1/StakeXEGLDStakingPlatform.git

# Navigate to contract directory
cd StakeXEGLDStakingPlatform/contract

# Build the contract
mxpy contract build
```

### Frontend
```bash
# Navigate to frontend directory
cd ../frontend

# Install dependencies
npm install

# Start development server
npm start
```

## Deployment
1. Configure wallet
2. Deploy to MultiversX Testnet
```bash
mxpy contract deploy \
  --contract=stakex \
  --recall-nonce \
  --pem=wallet.pem \
  --gas-limit=50000000 \
  --arguments 1000 \  # Initial APY
  --send
```

## Smart Contract Functions
- `stake()`: Stake EGLD tokens
- `unstake()`: Withdraw staked tokens
- `claimRewards()`: Claim accumulated rewards
- `getStakedAmount()`: Check staked balance
- `getApy()`: Current staking APY

## Security Considerations
- Wallet authentication
- Contract owner APY management
- Reward calculation precision

## Testnet Details
- Network: MultiversX Testnet
- Contract Address: [TO BE ADDED AFTER DEPLOYMENT]

## License
MIT License
