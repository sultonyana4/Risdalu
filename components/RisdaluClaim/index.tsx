import { useAccount } from 'wagmi';
import { ConnectWallet } from './ConnectWallet';
import { TokenBalance } from './TokenBalance';
import { ClaimButton } from './ClaimButton';
import { NetworkChecker } from './NetworkChecker';
import { monadTestnet } from 'viem/chains';

export const RisdaluClaim = () => {
  const { isConnected } = useAccount();

  return (
    <div className="w-full max-w-md mx-auto space-y-4">
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold">Risdalu Token (RIS)</h1>
        <p className="text-gray-400 mt-2">Claim your daily RIS tokens on Monad Testnet</p>
      </div>
      
      <ConnectWallet />
      
      {isConnected && (
        <>
          <NetworkChecker />
          <TokenBalance />
          <ClaimButton />
          
          <div className="text-center text-xs text-gray-400 mt-6">
            Contract Address: 0xabEe487470f53805c75ea33c07d43EF6F23E162e
            <br />
            Network: {monadTestnet.name} (Chain ID: {monadTestnet.id})
          </div>
        </>
      )}
    </div>
  );
};
