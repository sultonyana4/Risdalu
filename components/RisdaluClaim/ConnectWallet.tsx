import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { formatAddress } from '@/lib/contract/contract-config';
import { farcasterFrame } from '@farcaster/frame-wagmi-connector';

export const ConnectWallet = () => {
  const { address, isConnected } = useAccount();
  const { connect } = useConnect();
  const { disconnect } = useDisconnect();

  return (
    <div className="border border-[#333] rounded-md p-4 mb-4">
      <h2 className="text-xl font-bold mb-2">Wallet</h2>
      
      {isConnected ? (
        <div className="flex flex-col space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-gray-400">Connected:</span>
            <span className="bg-white font-mono text-black rounded-md p-1 text-sm">
              {formatAddress(address)}
            </span>
          </div>
          <button
            onClick={() => disconnect()}
            className="bg-white text-black rounded-md p-2 w-full text-sm"
          >
            Disconnect Wallet
          </button>
        </div>
      ) : (
        <button
          onClick={() => connect({ connector: farcasterFrame() })}
          className="bg-white text-black rounded-md p-2 w-full text-sm"
        >
          Connect Wallet
        </button>
      )}
    </div>
  );
};
