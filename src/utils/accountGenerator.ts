
import type { GeneratedAccount } from "@/pages/Index";

// Mock account data - In a real app, this would come from your text files
const mockAccounts = {
  disney: [
    "disney1@gmail.com:password123",
    "disney2@gmail.com:password456",
    "disney3@gmail.com:password789",
  ],
  netflix: [
    "netflix1@gmail.com:netflix123",
    "netflix2@gmail.com:netflix456",
    "netflix3@gmail.com:netflix789",
  ],
  spotify: [
    "spotify1@gmail.com:music123",
    "spotify2@gmail.com:music456",
    "spotify3@gmail.com:music789",
  ],
  roblox: [
    "roblox1@gmail.com:robux123",
    "roblox2@gmail.com:robux456",
    "roblox3@gmail.com:robux789",
  ],
  hbomax: [
    "hbo1@gmail.com:hbo123",
    "hbo2@gmail.com:hbo456",
    "hbo3@gmail.com:hbo789",
  ],
  crunchyroll: [
    "crunchyroll1@gmail.com:anime123",
    "crunchyroll2@gmail.com:anime456",
    "crunchyroll3@gmail.com:anime789",
  ],
  epicgames: [
    "epic1@gmail.com:fortnite123",
    "epic2@gmail.com:fortnite456",
    "epic3@gmail.com:fortnite789",
  ],
  origin: [
    "origin1@gmail.com:ea123",
    "origin2@gmail.com:ea456",
    "origin3@gmail.com:ea789",
  ],
};

// Store used accounts to prevent duplicates
const usedAccounts = new Set<string>();

export const generateAccount = (service: string): GeneratedAccount => {
  const serviceAccounts = mockAccounts[service as keyof typeof mockAccounts] || [];
  const availableAccounts = serviceAccounts.filter(account => !usedAccounts.has(account));
  
  if (availableAccounts.length === 0) {
    // If no accounts available, generate a random one
    const randomEmail = `${service}${Math.floor(Math.random() * 1000)}@gmail.com`;
    const randomPassword = `${service}${Math.floor(Math.random() * 1000)}`;
    
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
  
  // Mark as used
  usedAccounts.add(selectedAccount);
  
  return {
    id: Math.random().toString(36).substring(7),
    service,
    email,
    password,
    timestamp: new Date(),
  };
};
