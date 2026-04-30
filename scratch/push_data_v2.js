const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');

// Hardcoded for reliability in this environment
const supabaseUrl = 'https://wdobescrgbqwkefpdvuq.supabase.co';
const supabaseKey = 'sb_publishable_ZwriO0ye2VeS6uWKuz289A_dohsY1r7';

const supabase = createClient(supabaseUrl, supabaseKey);

const products = [
  // Lollipops
  { name: "Baba Lovely Pop Blueberry", category: "Lollipops", image: "/BABA LOVELY POP BLUEBERRY MARKUP.png", price: 'Export Grade' },
  { name: "Baba Lovely Pop Guava", category: "Lollipops", image: "/BABA LOVELY POP GUAVA MARKUP.png", price: 'Export Grade' },
  { name: "Baba Lovely Pop Mango", category: "Lollipops", image: "/BABA LOVELY POP MANGO MARKUP.png", price: 'Export Grade' },
  { name: "Baba Lovely Pop Orange", category: "Lollipops", image: "/BABA LOVELY POP ORANGE MARKUP.png", price: 'Export Grade' },
  { name: "Baba Lovely Pop Strawberry Icecream", category: "Lollipops", image: "/BABA LOVELY POP STRAWBERRY ICECREAM MARKUP.png", price: 'Export Grade' },
  { name: "Baba Lovely Pop Strawberry", category: "Lollipops", image: "/BABA LOVELY POP STRAWBERRY MARKUP.png", price: 'Export Grade' },
  { name: "Baba Lovely Pop Watermelon", category: "Lollipops", image: "/BABA LOVELY POP WATERMELON MARKUP.png", price: 'Export Grade' },
  { name: "DJ Butter Pop", category: "Lollipops", image: "/DJ Butter pop markup.png", price: 'Export Grade' },
  { name: "DJ Color Pop", category: "Lollipops", image: "/DJ Color Pop Markup.png", price: 'Export Grade' },
  { name: "DJ Love Pop", category: "Lollipops", image: "/DJ Love Pop Markup.png", price: 'Export Grade' },
  { name: "DJ Milk Pop", category: "Lollipops", image: "/DJ Milk Pop Markup.png", price: 'Export Grade' },
  { name: "DJ Whistle Lollipops", category: "Lollipops", image: "/DJ Whistle Lollipops Markup.png", price: 'Export Grade' },
  { name: "DJ Yogurt Pop Lollipop", category: "Lollipops", image: "/DJ Yogurt Pop Lollipop Markup.png", price: 'Export Grade' },
  { name: "DJ Fruitoo Lollipops", category: "Lollipops", image: "/DJ Fruitoo lollipops markup.png", price: 'Export Grade' },

  // Cookies & Biscuits
  { name: "DJ American Biscuits Combine", category: "Cookies & Biscuits", image: "/DJ American Biscuits Markup Combine.png", price: 'Export Grade' },
  { name: "DJ American Biscuits", category: "Cookies & Biscuits", image: "/DJ American Biscuits Markup.png", price: 'Export Grade' },
  { name: "DJ Butter Cookies", category: "Cookies & Biscuits", image: "/DJ Butter Cookies.png", price: 'Export Grade' },
  { name: "DJ Cashew Cookies", category: "Cookies & Biscuits", image: "/DJ CASHEW COOKIES.png", price: 'Export Grade' },
  { name: "DJ Chocochip Cookies", category: "Cookies & Biscuits", image: "/DJ CHOCOCHIP COOKIES.png", price: 'Export Grade' },
  { name: "DJ Coconut Cookies", category: "Cookies & Biscuits", image: "/DJ COCONUT COOKIES.png", price: 'Export Grade' },
  { name: "DJ Finger Shortbread Cookies", category: "Cookies & Biscuits", image: "/DJ FINGER SHORTBREAD COOKIES.png", price: 'Export Grade' },
  { name: "DJ Milk Cookies", category: "Cookies & Biscuits", image: "/DJ Milk Cookies.png", price: 'Export Grade' },
  { name: "DJ Original Shortbread", category: "Cookies & Biscuits", image: "/DJ ORIGINAL SHORTBREAD.png", price: 'Export Grade' },
  { name: "DJ Pistachio Cookies", category: "Cookies & Biscuits", image: "/DJ PISTACHIO COOKIES.png", price: 'Export Grade' },
  { name: "DJ Short Bread Cookies", category: "Cookies & Biscuits", image: "/DJ SHORT BREAD COOKIES.png", price: 'Export Grade' },
  { name: "DJ Superb Plus Cookies", category: "Cookies & Biscuits", image: "/DJ Superb Plus Cookies.png", price: 'Export Grade' },
  { name: "DJ Creamy Topper Chocolate", category: "Cookies & Biscuits", image: "/DJ Creamy topper Chocolate Markup.png", price: 'Export Grade' },
  { name: "DJ Creamy Topper Mango", category: "Cookies & Biscuits", image: "/DJ Creamy topper Mango Markup.png", price: 'Export Grade' },
  { name: "DJ Creamy Topper Orange", category: "Cookies & Biscuits", image: "/DJ Creamy topper Orange Markup.png", price: 'Export Grade' },
  { name: "DJ Creamy Topper Strawberry", category: "Cookies & Biscuits", image: "/DJ Creamy topper Strawberry Markup.png", price: 'Export Grade' },
  { name: "DJ Creamy Topper Combine", category: "Cookies & Biscuits", image: "/DJ Creamy Topper Combine.png", price: 'Export Grade' }
];

async function push() {
    console.log(`Starting push of ${products.length} products to database...`);
    
    // First clear existing data to avoid duplicates (optional but often requested)
    // const { error: deleteError } = await supabase.from('products').delete().neq('id', 0);
    // if (deleteError) console.error("Clear Error:", deleteError);

    const { data, error } = await supabase.from('products').insert(products);
    if (error) {
        console.error("Push Error:", error);
    } else {
        console.log("Successfully pushed all products to Supabase!");
    }
}

push();
