import { useRisdaluContract } from '@/hooks/use-risdalu-contract';

export const TokenBalance = () => {
  const { balance, claimAmount } = useRisdaluContract();

  return (
    <div className="border border-[#333] rounded-md p-4 mb-4">
      <h2 className="text-xl font-bold mb-2">RIS Token</h2>
      <div className="flex flex-col space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-gray-400">Your Balance:</span>
          <span className="text-xl font-semibold">{balance} RIS</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-400">Claim Amount:</span>
          <span>{claimAmount} RIS</span>
        </div>
      </div>
    </div>
  );
};
