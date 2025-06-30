
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

// Store used accounts to prevent duplicates - using localStorage for persistence
const getUsedAccounts = (): Set<string> => {
  try {
    const stored = localStorage.getItem('used_accounts');
    return stored ? new Set(JSON.parse(stored)) : new Set();
  } catch {
    return new Set();
  }
};

const saveUsedAccounts = (usedAccounts: Set<string>) => {
  try {
    localStorage.setItem('used_accounts', JSON.stringify(Array.from(usedAccounts)));
  } catch (error) {
    console.error('Failed to save used accounts:', error);
  }
};

export const generateAccount = (service: string): GeneratedAccount => {
  const serviceAccounts = mockAccounts[service as keyof typeof mockAccounts] || [];
  const usedAccounts = getUsedAccounts();
  
  // Filter out used accounts
  const availableAccounts = serviceAccounts.filter(account => !usedAccounts.has(account));
  
  console.log(`Available ${service} accounts:`, availableAccounts.length);
  console.log(`Used accounts total:`, usedAccounts.size);
  
  if (availableAccounts.length === 0) {
    // If no accounts available, generate a random one as fallback
    const randomEmail = `${service}${Math.floor(Math.random() * 10000)}@temp.com`;
    const randomPassword = `${service}${Math.floor(Math.random() * 10000)}`;
    
    console.log(`No more ${service} accounts available, generating random account`);
    
    return {
      id: Math.random().toString(36).substring(7),
      service,
      email: randomEmail,
      password: randomPassword,
      timestamp: new Date(),
    };
  }
  
  // Select random account from available ones
  const randomIndex = Math.floor(Math.random() * availableAccounts.length);
  const selectedAccount = availableAccounts[randomIndex];
  const [email, password] = selectedAccount.split(':');
  
  // Mark as used and save to localStorage
  usedAccounts.add(selectedAccount);
  saveUsedAccounts(usedAccounts);
  
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

// Function to reset used accounts (for testing purposes)
export const resetUsedAccounts = () => {
  try {
    localStorage.removeItem('used_accounts');
    console.log('Reset all used accounts');
  } catch (error) {
    console.error('Failed to reset used accounts:', error);
  }
};

// Function to get account statistics
export const getAccountStats = () => {
  const usedAccounts = getUsedAccounts();
  const stats: Record<string, { total: number; used: number; available: number }> = {};
  
  Object.entries(mockAccounts).forEach(([service, accounts]) => {
    const usedForService = accounts.filter(account => usedAccounts.has(account)).length;
    stats[service] = {
      total: accounts.length,
      used: usedForService,
      available: accounts.length - usedForService
    };
  });
  
  return stats;
};
