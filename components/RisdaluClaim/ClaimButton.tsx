import { useRisdaluContract } from '@/hooks/use-risdalu-contract';
import { getBlockExplorerUrl } from '@/lib/contract/contract-config';
import { formatTime } from '@/lib/utils/time';
import { useEffect, useState } from 'react';

export const ClaimButton = () => {
  const {
    isClaimable,
    countdown,
    claimTokens,
    transactionStatus,
  } = useRisdaluContract();
  
  const [showTxInfo, setShowTxInfo] = useState(false);
  
  // Auto-hide transaction info after success
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    if (transactionStatus.isSuccess && showTxInfo) {
      timeoutId = setTimeout(() => {
        setShowTxInfo(false);
      }, 5000);
    }
    return () => clearTimeout(timeoutId);
  }, [transactionStatus.isSuccess, showTxInfo]);
  
  // Show transaction info when a transaction happens
  useEffect(() => {
    if (transactionStatus.txHash) {
      setShowTxInfo(true);
    }
  }, [transactionStatus.txHash]);

  return (
    <div className="border border-[#333] rounded-md p-4">
      <h2 className="text-xl font-bold mb-2">Claim RIS Tokens</h2>
      
      {/* Countdown or claim button */}
      <div className="mb-4">
        {isClaimable ? (
          <button
            onClick={claimTokens}
            disabled={transactionStatus.isLoading}
            className={`bg-white text-black rounded-md p-2 w-full text-sm font-medium ${
              transactionStatus.isLoading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {transactionStatus.isLoading ? 'Claiming...' : 'Claim RIS Tokens'}
          </button>
        ) : (
          <div className="text-center">
            <div className="text-sm text-gray-400 mb-2">Next claim available in:</div>
            <div className="text-2xl font-mono">{countdown !== null ? formatTime(countdown) : 'Loading...'}</div>
          </div>
        )}
      </div>
      
      {/* Transaction status */}
      {showTxInfo && (
        <div className={`rounded-md p-3 mb-3 ${
          transactionStatus.isSuccess 
          ? 'bg-green-900/20 border border-green-800' 
          : transactionStatus.isError 
          ? 'bg-red-900/20 border border-red-800'
          : 'bg-yellow-900/20 border border-yellow-800'
        }`}>
          <div className="flex flex-col space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">
                {transactionStatus.isSuccess 
                  ? 'Transaction Successful!' 
                  : transactionStatus.isError 
                  ? 'Transaction Failed'
                  : 'Transaction Pending...'}
              </span>
              <button 
                onClick={() => setShowTxInfo(false)}
                className="text-xs opacity-70 hover:opacity-100"
              >
                ✕
              </button>
            </div>
            
            {transactionStatus.txHash && (
              <a 
                href={getBlockExplorerUrl(transactionStatus.txHash)} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-xs underline opacity-80 hover:opacity-100"
              >
                View on Block Explorer
              </a>
            )}
          </div>
        </div>
      )}
      
      <div className="text-xs text-gray-400 mt-2">
        You can claim 1 ETH worth of RIS tokens every 24 hours.
      </div>
    </div>
  );
};
