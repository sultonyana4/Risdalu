import { useEffect, useState } from 'react';
import { useSwitchChain, useAccount, useChainId } from 'wagmi';
import { monadTestnet } from 'viem/chains';

export const useNetworkCheck = () => {
  const { isConnected } = useAccount();
  const chainId = useChainId();
  const { switchChain } = useSwitchChain();
  const [isCorrectNetwork, setIsCorrectNetwork] = useState(false);

  useEffect(() => {
    if (isConnected) {
      setIsCorrectNetwork(chainId === monadTestnet.id);
    }
  }, [chainId, isConnected]);

  const switchToMonadTestnet = () => {
    if (isConnected && chainId !== monadTestnet.id) {
      switchChain({ chainId: monadTestnet.id });
    }
  };

  return {
    isCorrectNetwork,
    switchToMonadTestnet,
    requiredChainId: monadTestnet.id,
    requiredChainName: monadTestnet.name
  };
};
