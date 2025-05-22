import { useNetworkCheck } from '@/hooks/use-network-check';

export const NetworkChecker = () => {
  const { isCorrectNetwork, switchToMonadTestnet, requiredChainName } = useNetworkCheck();

  if (isCorrectNetwork) return null;

  return (
    <div className="border border-yellow-800 bg-yellow-900/20 rounded-md p-4 mb-4">
      <div className="flex flex-col space-y-3">
        <div className="flex items-center space-x-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-500" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          <span className="font-medium">Wrong Network</span>
        </div>
        <p className="text-sm">
          Please switch to {requiredChainName} to interact with this application.
        </p>
        <button
          onClick={switchToMonadTestnet}
          className="bg-white text-black rounded-md py-2 px-4 text-sm font-medium"
        >
          Switch to {requiredChainName}
        </button>
      </div>
    </div>
  );
};
