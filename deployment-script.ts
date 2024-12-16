import { 
  NetworkConfig, 
  ProxyNetworkProvider 
} from '@multiversx/sdk-network-providers';
import { 
  ContractDeployer, 
  WalletProvider 
} from '@multiversx/sdk-wallet';

async function deployStakeXContract() {
  // Configure network (Testnet)
  const networkConfig = new NetworkConfig({
    id: 'testnet',
    chainId: 'T',
    provider: 'https://testnet-gateway.multiversx.com'
  });

  const proxy = new ProxyNetworkProvider(networkConfig.providerUrl);
  const wallet = new WalletProvider('path/to/wallet.json');

  // Load contract bytecode
  const contractBytecode = fs.readFileSync('./stakex-contract.wasm');

  // Initial contract deployment parameters
  const initialApy = 1000; // 10% APY

  const deploymentTransaction = await ContractDeployer.deploy({
    deployer: wallet,
    contractBytecode,
    initArguments: [initialApy],
    gasLimit: 50_000_000,
    networkConfig
  });

  console.log('Contract deployed at:', deploymentTransaction.contractAddress);
}

deployStakeXContract();
