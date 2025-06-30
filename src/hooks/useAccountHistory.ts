
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
      // Set the user context for RLS
      await supabase.rpc('set_config', {
        setting_name: 'app.current_user_id',
        setting_value: userId
      });

      const { data, error } = await supabase
        .from('accounts')
        .select('*')
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
    } catch (error) {
      console.error('Error loading account history:', error);
    }
  };

  // Save account to Supabase
  const saveAccount = async (account: GeneratedAccount) => {
    if (!userId) return;

    try {
      // Set the user context for RLS
      await supabase.rpc('set_config', {
        setting_name: 'app.current_user_id',
        setting_value: userId
      });

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
        return;
      }

      // Add to local state
      setAccountHistory(prev => [account, ...prev]);
    } catch (error) {
      console.error('Error saving account:', error);
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
