const { createClient } = require('@supabase/supabase-js');
const { staticProductsFallback } = require('../src/lib/products');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

async function seed() {
    console.log("Seeding database with clean data...");
    const formatted = staticProductsFallback.map(p => ({
        name: p.name,
        category: p.category,
        image: p.image,
        price: 'Export Grade'
    }));
    
    const { error } = await supabase.from('products').insert(formatted);
    if (error) console.error(error);
    else console.log("Seeded successfully!");
}

seed();
