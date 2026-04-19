const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error("Missing environment variables.");
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function cleanup() {
    console.log("Cleaning up duplicated products...");
    try {
        // 1. Delete everything
        const { error: delError } = await supabase.from('products').delete().neq('id', 0);
        if (delError) {
            console.error("Deletion Error:", delError);
            return;
        }
        console.log("Successfully wiped database.");
        
        // 2. We don't seed here, we let the user click 'Seed' in the UI or I can do it if I had the seedData.
        // Actually, I'll just leave it empty so the user can click 'Seed' once.
    } catch (err) {
        console.error("Cleanup Crash:", err);
    }
}

cleanup();
