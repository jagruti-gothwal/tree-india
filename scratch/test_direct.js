
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://wdobescrgbqwkefpdvuq.supabase.co';
const supabaseKey = 'sb_publishable_ZwriO0ye2VeS6uWKuz289A_dohsY1r7';

const supabase = createClient(supabaseUrl, supabaseKey);

async function testConnection() {
  console.log("Testing connection...");
  try {
    const { data, error } = await supabase.from('products').select('*').limit(1);
    if (error) {
      console.error("Fetch Error:", error);
    } else {
      console.log("Fetch Success, data:", data);
    }
  } catch (err) {
    console.error("Crash Error:", err);
  }
}

testConnection();
