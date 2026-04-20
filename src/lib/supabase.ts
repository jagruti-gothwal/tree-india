import { createClient } from "@supabase/supabase-js";

// Ensure these environment variables are defined in your .env.local file.
// If not, Supabase will not initialize.
// Use a function to ensure environment variables are read at the time of client creation
export const getSupabaseClient = () => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
  
  if (!supabaseUrl || !supabaseAnonKey) {
    console.warn("Supabase credentials missing in environment variables.");
  }
  
  return createClient(supabaseUrl, supabaseAnonKey);
};

export const supabase = getSupabaseClient();
