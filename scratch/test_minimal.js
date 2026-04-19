const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

console.log("URL:", supabaseUrl);
console.log("KEY Start:", supabaseKey ? supabaseKey.substring(0, 15) : "MISSING");

if (!supabaseUrl || !supabaseKey) {
    console.error("Missing environment variables.");
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function test() {
    console.log("Starting test fetch...");
    try {
        const { count, error } = await supabase.from('products').select('*', { count: 'exact', head: true });
        if (error) {
            console.error("Supabase Error:", error);
        } else {
            console.log("Database Product Count:", count);
        }
    } catch (err) {
        console.error("Runtime Exception:", err);
    }
}

test();
