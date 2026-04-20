// Test script to check environment variables
import 'dotenv/config'; // Try to load .env if available

console.log("Checking Environment Variables...");
console.log("NEXT_PUBLIC_SUPABASE_URL:", process.env.NEXT_PUBLIC_SUPABASE_URL ? "FOUND (starts with " + process.env.NEXT_PUBLIC_SUPABASE_URL.substring(0, 10) + "...)" : "MISSING");
console.log("NEXT_PUBLIC_SUPABASE_ANON_KEY:", process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? "FOUND" : "MISSING");
console.log("ADMIN_PASSWORD:", process.env.ADMIN_PASSWORD ? "FOUND" : "MISSING");
