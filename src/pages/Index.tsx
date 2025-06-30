
import { useState } from "react";
import { Header } from "@/components/Header";
import { ServiceSelector } from "@/components/ServiceSelector";
import { AccountDisplay } from "@/components/AccountDisplay";
import { AccountHistory } from "@/components/AccountHistory";
import { FeatureCards } from "@/components/FeatureCards";
import { generateAccount } from "@/utils/accountGenerator";
import { useAccountHistory } from "@/hooks/useAccountHistory";
import { toast } from "sonner";

export interface GeneratedAccount {
  id: string;
  service: string;
  email: string;
  password: string;
  timestamp: Date;
}

const sendDiscordWebhook = async (service: string) => {
  const webhookUrl = "https://discord.com/api/webhooks/1389330672103194645/VdNQSITvBEORsXtTtdL1eHprPuKcpGVG6U4VnPyMb8IAmYmF8XAbF0CWCs2tXM3VHMHk";
  
  try {
    await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        content: `Someone has just generated a **${service.charAt(0).toUpperCase() + service.slice(1)}** account from our website! \n\nWant to gen too? Join our website gen ⬇️\nhttps://test22.com`
      }),
    });
    console.log("Discord webhook sent successfully");
  } catch (error) {
    console.error("Error sending Discord webhook:", error);
  }
};

const Index = () => {
  const [selectedService, setSelectedService] = useState<string>("");
  const [generatedAccount, setGeneratedAccount] = useState<GeneratedAccount | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const { accountHistory, saveAccount } = useAccountHistory();

  const handleGenerate = async () => {
    if (!selectedService) return;
    
    setIsGenerating(true);
    
    // Simulate API call delay
    setTimeout(async () => {
      try {
        const account = generateAccount(selectedService);
        
        if (!account) {
          // No more accounts available
          toast.error(`No more ${selectedService.charAt(0).toUpperCase() + selectedService.slice(1)} accounts available. Please wait for restock!`);
          setGeneratedAccount(null);
          setIsGenerating(false);
          return;
        }
        
        setGeneratedAccount(account);
        
        // Save to Supabase - this will also add to local state
        const success = await saveAccount(account);
        
        if (success) {
          toast.success(`${selectedService.charAt(0).toUpperCase() + selectedService.slice(1)} account generated and saved!`);
        } else {
          toast.error("Account generated but failed to save to history");
        }
        
        // Send Discord webhook
        await sendDiscordWebhook(selectedService);
      } catch (error) {
        console.error('Error generating account:', error);
        toast.error("Failed to generate account");
      } finally {
        setIsGenerating(false);
      }
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Generator Section */}
          <div className="lg:col-span-2">
            <div className="bg-gray-800 rounded-xl p-8 border border-gray-700 shadow-2xl shadow-green-500/10">
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
                  EngineOS Gen
                </h1>
                <p className="text-gray-400">
                  Get accounts for your favorite services for free by just seeing an ad
                </p>
              </div>

              <div className="space-y-6">
                <ServiceSelector 
                  selectedService={selectedService}
                  onServiceChange={setSelectedService}
                />

                <button
                  onClick={handleGenerate}
                  disabled={!selectedService || isGenerating}
                  className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 disabled:from-gray-700 disabled:to-gray-700 disabled:cursor-not-allowed text-white py-3 px-6 rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2 hover:scale-105 shadow-lg shadow-green-500/25"
                >
                  {isGenerating ? (
                    <>
                      <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <span>🎯</span>
                      Generate
                    </>
                  )}
                </button>
              </div>

              {generatedAccount && (
                <AccountDisplay account={generatedAccount} />
              )}
            </div>
          </div>

          {/* Account History Sidebar */}
          <div className="lg:col-span-1">
            <AccountHistory accounts={accountHistory} />
          </div>
        </div>

        {/* Feature Cards */}
        <FeatureCards />

        {/* Footer */}
        <footer className="text-center py-8 text-gray-500">
          <p>Made by elmejor and EngineOS</p>
        </footer>
      </main>
    </div>
  );
};

export default Index;
