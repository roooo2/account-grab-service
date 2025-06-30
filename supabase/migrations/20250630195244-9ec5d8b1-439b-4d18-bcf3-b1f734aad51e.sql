
-- Drop existing tables
DROP TABLE IF EXISTS public.user_upgrades CASCADE;
DROP TABLE IF EXISTS public.game_sessions CASCADE;
DROP TABLE IF EXISTS public.signing_jobs CASCADE;
DROP TABLE IF EXISTS public.profiles CASCADE;

-- Create accounts table for storing generated accounts
CREATE TABLE public.accounts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id TEXT NOT NULL,
  service TEXT NOT NULL,
  email TEXT NOT NULL,
  password TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create index for faster queries
CREATE INDEX idx_accounts_user_id ON public.accounts(user_id);
CREATE INDEX idx_accounts_created_at ON public.accounts(created_at DESC);

-- Enable Row Level Security
ALTER TABLE public.accounts ENABLE ROW LEVEL SECURITY;

-- Create policy to allow users to see only their own accounts
CREATE POLICY "Users can view their own accounts" 
  ON public.accounts 
  FOR SELECT 
  USING (user_id = current_setting('app.current_user_id', true));

-- Create policy to allow users to insert their own accounts
CREATE POLICY "Users can create their own accounts" 
  ON public.accounts 
  FOR INSERT 
  WITH CHECK (user_id = current_setting('app.current_user_id', true));

-- Create policy to allow users to delete their own accounts
CREATE POLICY "Users can delete their own accounts" 
  ON public.accounts 
  FOR DELETE 
  USING (user_id = current_setting('app.current_user_id', true));
