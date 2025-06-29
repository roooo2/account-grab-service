
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { copy } from "lucide-react";
import { toast } from "sonner";
import type { GeneratedAccount } from "@/pages/Index";

interface AccountDisplayProps {
  account: GeneratedAccount;
}

export const AccountDisplay = ({ account }: AccountDisplayProps) => {
  const [isVisible, setIsVisible] = useState(false);

  // Trigger animation on mount
  useState(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  });

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard!");
  };

  const copyAccountInfo = () => {
    const accountInfo = `${account.email}:${account.password}`;
    copyToClipboard(accountInfo);
  };

  const copyEmail = () => {
    copyToClipboard(account.email);
  };

  const copyPassword = () => {
    copyToClipboard(account.password);
  };

  return (
    <div className={`mt-8 transform transition-all duration-500 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
      <div className="bg-gray-700 rounded-lg p-6 border border-gray-600">
        <div className="text-center mb-4">
          <h3 className="text-lg font-semibold text-green-400 mb-1">
            {account.service.charAt(0).toUpperCase() + account.service.slice(1)} Account Generated!
          </h3>
          <p className="text-sm text-gray-400">Click to copy individual fields or the full account info</p>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between bg-gray-800 rounded-lg p-3">
            <div>
              <label className="text-xs text-gray-400 block">Email</label>
              <span className="text-white font-mono">{account.email}</span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={copyEmail}
              className="text-gray-400 hover:text-white"
            >
              <copy className="w-4 h-4" />
            </Button>
          </div>

          <div className="flex items-center justify-between bg-gray-800 rounded-lg p-3">
            <div>
              <label className="text-xs text-gray-400 block">Password</label>
              <span className="text-white font-mono">{account.password}</span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={copyPassword}
              className="text-gray-400 hover:text-white"
            >
              <copy className="w-4 h-4" />
            </Button>
          </div>

          <Button
            onClick={copyAccountInfo}
            className="w-full bg-green-600 hover:bg-green-700 text-white"
          >
            <copy className="w-4 h-4 mr-2" />
            Copy Account Info
          </Button>
        </div>
      </div>
    </div>
  );
};
