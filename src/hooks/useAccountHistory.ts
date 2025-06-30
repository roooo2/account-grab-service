
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import type { GeneratedAccount } from '@/pages/Index';

export const useAccountHistory = () => {
  const [accountHistory, setAccountHistory] = useState<GeneratedAccount[]>([]);
  const [userId, setUserId] = useState<string>('');

  // Generate or get user ID for anonymous users
  useEffect(() => {
    let storedUserId = localStorage.getItem('anonymous_user_id');
    if (!storedUserId) {
      storedUserId = `anon_${Math.random().toString(36).substring(2, 15)}`;
      localStorage.setItem('anonymous_user_id', storedUserId);
    }
    setUserId(storedUserId);
  }, []);

  // Load account history from Supabase
  const loadAccountHistory = async () => {
    if (!userId) return;

    try {
      console.log('Loading account history for user:', userId);
      
      const { data, error } = await supabase
        .from('accounts')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false })
        .limit(50);

      if (error) {
        console.error('Error loading account history:', error);
        return;
      }

      const formattedAccounts: GeneratedAccount[] = data.map(account => ({
        id: account.id,
        service: account.service,
        email: account.email,
        password: account.password,
        timestamp: new Date(account.created_at)
      }));

      setAccountHistory(formattedAccounts);
      console.log('Loaded account history:', formattedAccounts.length, 'accounts');
    } catch (error) {
      console.error('Error loading account history:', error);
    }
  };

  // Save account to Supabase
  const saveAccount = async (account: GeneratedAccount): Promise<boolean> => {
    if (!userId) {
      console.error('No user ID available for saving account');
      return false;
    }

    try {
      console.log('Saving account for user:', userId, 'Account:', account.email);
      
      const { error } = await supabase
        .from('accounts')
        .insert({
          user_id: userId,
          service: account.service,
          email: account.email,
          password: account.password
        });

      if (error) {
        console.error('Error saving account:', error);
        return false;
      }

      // Add to local state immediately
      setAccountHistory(prev => [account, ...prev]);
      console.log('Account saved successfully:', account.email);
      return true;
    } catch (error) {
      console.error('Error saving account:', error);
      return false;
    }
  };

  // Load history when userId is available
  useEffect(() => {
    if (userId) {
      loadAccountHistory();
    }
  }, [userId]);

  return {
    accountHistory,
    saveAccount,
    loadAccountHistory
  };
};
