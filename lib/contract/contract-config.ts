import { createPublicClient, http, createWalletClient, custom } from 'viem';
import { monadTestnet } from 'viem/chains';
import RisdaluClaimABI from './RisdaluClaim.json';

export const RISDALU_CONTRACT_ADDRESS = '0xabEe487470f53805c75ea33c07d43EF6F23E162e';
export const RISDALU_CONTRACT_ABI = RisdaluClaimABI;

export const monadTestnetClient = createPublicClient({
  chain: monadTestnet,
  transport: http('https://testnet-rpc.monad.xyz'),
});

export const getWalletClient = (provider: any) => {
  if (!provider) return null;
  
  return createWalletClient({
    chain: monadTestnet,
    transport: custom(provider),
  });
};

export const formatAddress = (address: string | undefined) => {
  if (!address) return '';
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
};

export const getBlockExplorerUrl = (txHash: string) => {
  return `https://testnet.monadexplorer.com/tx/${txHash}`;
};
