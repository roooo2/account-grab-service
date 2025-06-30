
import type { GeneratedAccount } from "@/pages/Index";

// Mock account data - In a real app, this would come from your text files
const mockAccounts = {
  disney: [
    "disney1@gmail.com:password123",
    "disney2@gmail.com:password456",
    "disney3@gmail.com:password789",
    "disney4@gmail.com:disney2024",
    "disney5@gmail.com:mickey123",
  ],
  netflix: [
    "netflix1@gmail.com:netflix123",
    "netflix2@gmail.com:netflix456",
    "netflix3@gmail.com:netflix789",
    "netflix4@gmail.com:stream2024",
    "netflix5@gmail.com:movies123",
  ],
  spotify: [
    "spotify1@gmail.com:music123",
    "spotify2@gmail.com:music456",
    "spotify3@gmail.com:music789",
    "spotify4@gmail.com:beats2024",
    "spotify5@gmail.com:songs123",
  ],
  roblox: [
    "roblox1@gmail.com:robux123",
    "roblox2@gmail.com:robux456",
    "roblox3@gmail.com:robux789",
    "roblox4@gmail.com:blocks2024",
    "roblox5@gmail.com:games123",
  ],
  hbomax: [
    "hbo1@gmail.com:hbo123",
    "hbo2@gmail.com:hbo456",
    "hbo3@gmail.com:hbo789",
    "hbo4@gmail.com:max2024",
    "hbo5@gmail.com:shows123",
  ],
  crunchyroll: [
    "crunchyroll1@gmail.com:anime123",
    "crunchyroll2@gmail.com:anime456",
    "crunchyroll3@gmail.com:anime789",
    "crunchyroll4@gmail.com:manga2024",
    "crunchyroll5@gmail.com:otaku123",
  ],
  epicgames: [
    "epic1@gmail.com:fortnite123",
    "epic2@gmail.com:fortnite456",
    "epic3@gmail.com:fortnite789",
    "epic4@gmail.com:unreal2024",
    "epic5@gmail.com:gaming123",
  ],
  origin: [
    "origin1@gmail.com:ea123",
    "origin2@gmail.com:ea456",
    "origin3@gmail.com:ea789",
    "origin4@gmail.com:origin2024",
    "origin5@gmail.com:sports123",
  ],
};

// Store globally used accounts to prevent duplicates across all users
const getGloballyUsedAccounts = (): Set<string> => {
  try {
    const stored = localStorage.getItem('globally_used_accounts');
    return stored ? new Set(JSON.parse(stored)) : new Set();
  } catch {
    return new Set();
  }
};

const saveGloballyUsedAccounts = (usedAccounts: Set<string>) => {
  try {
    localStorage.setItem('globally_used_accounts', JSON.stringify(Array.from(usedAccounts)));
  } catch (error) {
    console.error('Failed to save globally used accounts:', error);
  }
};

export const generateAccount = (service: string): GeneratedAccount | null => {
  const serviceAccounts = mockAccounts[service as keyof typeof mockAccounts] || [];
  const globallyUsedAccounts = getGloballyUsedAccounts();
  
  // Filter out globally used accounts
  const availableAccounts = serviceAccounts.filter(account => !globallyUsedAccounts.has(account));
  
  console.log(`Available ${service} accounts:`, availableAccounts.length);
  console.log(`Globally used accounts total:`, globallyUsedAccounts.size);
  
  if (availableAccounts.length === 0) {
    console.log(`No more ${service} accounts available`);
    return null; // Return null when no accounts available
  }
  
  // Select random account from available ones
  const randomIndex = Math.floor(Math.random() * availableAccounts.length);
  const selectedAccount = availableAccounts[randomIndex];
  const [email, password] = selectedAccount.split(':');
  
  // Mark as globally used and save to localStorage
  globallyUsedAccounts.add(selectedAccount);
  saveGloballyUsedAccounts(globallyUsedAccounts);
  
  console.log(`Generated ${service} account:`, email);
  console.log(`Remaining ${service} accounts:`, availableAccounts.length - 1);
  
  return {
    id: Math.random().toString(36).substring(7),
    service,
    email,
    password,
    timestamp: new Date(),
  };
};

// Function to reset globally used accounts (for testing purposes)
export const resetGloballyUsedAccounts = () => {
  try {
    localStorage.removeItem('globally_used_accounts');
    console.log('Reset all globally used accounts');
  } catch (error) {
    console.error('Failed to reset globally used accounts:', error);
  }
};

// Function to get account statistics
export const getAccountStats = () => {
  const globallyUsedAccounts = getGloballyUsedAccounts();
  const stats: Record<string, { total: number; used: number; available: number }> = {};
  
  Object.entries(mockAccounts).forEach(([service, accounts]) => {
    const usedForService = accounts.filter(account => globallyUsedAccounts.has(account)).length;
    stats[service] = {
      total: accounts.length,
      used: usedForService,
      available: accounts.length - usedForService
    };
  });
  
  return stats;
};
