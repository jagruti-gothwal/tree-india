
require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("Missing Supabase credentials in .env.local");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function testConnection() {
  console.log("Testing connection to:", supabaseUrl);
  
  const { data: products, error: pError } = await supabase.from('products').select('count', { count: 'exact', head: true });
  if (pError) console.error("Products table error:", pError.message);
  else console.log("Products count:", products ? products.length : 0);

  const { data: inquiries, error: iError } = await supabase.from('inquiries').select('count', { count: 'exact', head: true });
  if (iError) console.error("Inquiries table error:", iError.message);
  else console.log("Inquiries count:", inquiries ? inquiries.length : 0);
}

testConnection();
