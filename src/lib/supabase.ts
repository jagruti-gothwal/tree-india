import { createClient } from "@supabase/supabase-js";

// Ensure these environment variables are defined in your .env.local file.
// If not, Supabase will not initialize.
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
