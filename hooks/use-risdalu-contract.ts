import { useCallback, useEffect, useState } from 'react';
import { useAccount, useReadContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { formatEther, parseEther } from 'viem';
import { RISDALU_CONTRACT_ADDRESS, RISDALU_CONTRACT_ABI } from '@/lib/contract/contract-config';

export const useRisdaluContract = () => {
  const { address, isConnected } = useAccount();
  const [countdown, setCountdown] = useState<number | null>(null);
  const [isClaimable, setIsClaimable] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  // Read contract functions
  const { data: balanceData, refetch: refetchBalance } = useReadContract({
    address: RISDALU_CONTRACT_ADDRESS,
    abi: RISDALU_CONTRACT_ABI,
    functionName: 'balanceOf',
    args: address ? [address as `0x${string}`] : undefined,
    query: {
      enabled: !!address && isConnected,
    }
  });

  const { data: lastClaimedData, refetch: refetchLastClaimed } = useReadContract({
    address: RISDALU_CONTRACT_ADDRESS,
    abi: RISDALU_CONTRACT_ABI,
    functionName: 'lastClaimed',
    args: address ? [address as `0x${string}`] : undefined,
    query: {
      enabled: !!address && isConnected,
    }
  });

  const { data: claimPeriodData } = useReadContract({
    address: RISDALU_CONTRACT_ADDRESS,
    abi: RISDALU_CONTRACT_ABI,
    functionName: 'CLAIM_PERIOD',
    query: {
      enabled: isConnected,
    }
  });

  const { data: claimAmountData } = useReadContract({
    address: RISDALU_CONTRACT_ADDRESS,
    abi: RISDALU_CONTRACT_ABI,
    functionName: 'CLAIM_AMOUNT',
    query: {
      enabled: isConnected,
    }
  });

  // Write contract function
  const { writeContract, status: writeStatus, data: writeData } = useWriteContract();
  
  // Wait for transaction to be mined
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash: writeData,
  });

  // Format balance
  const formattedBalance = balanceData ? formatEther(balanceData as bigint) : '0';
  
  // Format claim amount
  const formattedClaimAmount = claimAmountData ? formatEther(claimAmountData as bigint) : '0';

  // Calculate time until next claim
  useEffect(() => {
    const calculateCountdown = () => {
      if (!lastClaimedData || !claimPeriodData) {
        console.error("Data kontrak tidak tersedia:", {
          lastClaimedData,
          claimPeriodData,
        });
        return;
      }

      const lastClaimed = Number(lastClaimedData);
      const claimPeriod = Number(claimPeriodData);
      const now = Math.floor(Date.now() / 1000);
      console.log("Log Debug:", { lastClaimed, claimPeriod, now });

      const nextClaimTime = lastClaimed + claimPeriod;

      if (nextClaimTime <= now) {
        setIsClaimable(true);
        setCountdown(0);
      } else {
        setIsClaimable(false);
        setCountdown(nextClaimTime - now);
      }
    };

    calculateCountdown();

    const intervalId = setInterval(() => {
      calculateCountdown();
    }, 1000);

    return () => clearInterval(intervalId);
  }, [lastClaimedData, claimPeriodData, refreshTrigger]);

  // Refresh data
  const refreshData = useCallback(() => {
    refetchBalance();
    refetchLastClaimed();
    setRefreshTrigger(prev => prev + 1);
  }, [refetchBalance, refetchLastClaimed]);

  // Claim tokens
  const claimTokens = useCallback(() => {
    if (!isClaimable || !isConnected) return;
    
    writeContract({
      address: RISDALU_CONTRACT_ADDRESS,
      abi: RISDALU_CONTRACT_ABI,
      functionName: 'claim',
    });
  }, [isClaimable, isConnected, writeContract]);

  // Effect to refresh data after successful transaction
  useEffect(() => {
    if (isConfirmed) {
      refreshData();
    }
  }, [isConfirmed, refreshData]);

  return {
    balance: formattedBalance,
    claimAmount: formattedClaimAmount,
    countdown,
    isClaimable,
    claimTokens,
    refreshData,
    transactionStatus: {
      isLoading: writeStatus === 'pending' || isConfirming,
      isSuccess: isConfirmed,
      isPending: writeStatus === 'pending',
      isError: writeStatus === 'error',
      txHash: writeData,
    }
  };
};
