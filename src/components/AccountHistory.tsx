
import type { GeneratedAccount } from "@/pages/Index";

interface AccountHistoryProps {
  accounts: GeneratedAccount[];
}

export const AccountHistory = ({ accounts }: AccountHistoryProps) => {
  return (
    <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 shadow-2xl shadow-blue-500/10">
      <div className="flex items-center gap-2 mb-4">
        <span className="text-xl">🕐</span>
        <h2 className="text-lg font-semibold">Your Account History</h2>
      </div>

      {accounts.length === 0 ? (
        <p className="text-gray-400 text-center py-8">No accounts generated yet</p>
      ) : (
        <div className="space-y-3 max-h-96 overflow-y-auto">
          {accounts.map((account) => (
            <div
              key={account.id}
              className="bg-gray-900 rounded-lg p-3 border border-gray-600 animate-fade-in hover:border-green-500/50 transition-all duration-200"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-green-400">
                  {account.service.charAt(0).toUpperCase() + account.service.slice(1)}
                </span>
                <span className="text-xs text-gray-400">
                  {account.timestamp.toLocaleTimeString()}
                </span>
              </div>
              <div className="text-xs text-gray-300 font-mono">
                {account.email}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
