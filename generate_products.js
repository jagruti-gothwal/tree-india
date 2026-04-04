const fs = require('fs');

const files = [
"1.png", "2.png", "BABA LOVELY POP BLUEBERRY MARKUP.png", "BABA LOVELY POP GUAVA MARKUP.png", 
"BABA LOVELY POP MANGO MARKUP.png", "BABA LOVELY POP ORANGE MARKUP.png", "BABA LOVELY POP STRAWBERRY ICECREAM MARKUP.png", 
"BABA LOVELY POP STRAWBERRY MARKUP.png", "BABA LOVELY POP WATERMELON MARKUP.png", "BABA MILK FRESH Markup.png", 
"Boost Chocolate.png", "DJ American Biscuits Markup Combine.png", "DJ American Biscuits Markup.png", 
"DJ BUTTER COOKIES.png", "DJ Bigg Boom Markup.png", "DJ Boost wheat.png", "DJ Butter and Milk Candy.png", 
"DJ Butter pop markup.png", "DJ CASHEW COOKIE DISPLAY.png", "DJ CASHEW COOKIES.png", "DJ CHOCOCHIP COOKIES.png", 
"DJ CHOCOHIP COOKIE DISPLAY.png", "DJ COCONUT COOKIE DISPLAY.png", "DJ COCONUT COOKIES.png", "DJ COCOVIBE AI.png", 
"DJ CREAM CHOCOLATE MARKUP.png", "DJ CREAM COMBINE.png", "DJ CREAM FRESH MARKUP.png", "DJ CREAM MANGO MARKUP.png", 
"DJ CREAM PINEAPPLE MARKUP.png", "DJ CREAM STRAWBERRY MARKUP.png", "DJ CREAM VANILLA MARKUP.png", 
"DJ CREMO CHOCOLATE Markup.png", "DJ CREMO COMBINE.png", "DJ CREMO MANGO markup.png", "DJ CREMO ORANGE Markup.png", 
"DJ CREMO PINEAPPLE Markup.png", "DJ CREMO STRAWBERRY MARKUP.png", "DJ CREMO VANILLA Markup.png", 
"DJ Choco Eclairs Jar Markup.png", "DJ Choco Eclairs Markup Pouch.png", "DJ Chocofull Toffee Markup.png", 
"DJ Chocolate Jar Markup.png", "DJ Coconut Desire Toffee Markup.png", "DJ Coconut Eclairs Jar Markup.png", 
"DJ Coconut Jar Markup.png", "DJ Cocovibe Markup.png", "DJ Color Pop Markup.png", "DJ Conico Chocolate.png", 
"DJ Conico Mango.png", "DJ Conico Orange.png", "DJ Conico Strawberry.png", "DJ Creamy Topper Combine.png", 
"DJ Creamy topper Chocolate Markup.png", "DJ Creamy topper Mango Markup.png", "DJ Creamy topper Orange Markup.png", 
"DJ Creamy topper Strawberry Markup.png", "DJ FINGER SHORTBREAD COOKIES DISPLAY.png", "DJ FINGER SHORTBREAD COOKIES.png", 
"DJ FRENZY AI.png", "DJ Football Markup.png", "DJ Frenzy Markup.png", "DJ Frubon Jar Markup.png", 
"DJ Frubon Pouch Markup.png", "DJ Fruit Shots Toffee Markup.png", "DJ Fruitoo lollipops markup.png", 
"DJ Fruits Candy Markup.png", "DJ Glucose Markup.png", "DJ Gum Pops Markup.png", "DJ LOL Candy Markup.png", 
"DJ Love Pop Markup.png", "DJ MILK COOKIES.png", "DJ Milk Candy Markup.png", "DJ Milk Eclairs Jar Markup.png", 
"DJ Milk Plus Markup.png", "DJ Milk Pop Markup.png", "DJ Milkshake Toffee Markup.png", "DJ Mint Cool Candy Markup.png", 
"DJ My Milk Markup Jar.png", "DJ Nice Markup.png", "DJ OLIVARY Bubblegum Markup.png", 
"DJ ORIGINAL SHORTBREAD COOKIES DISPLAY.png", "DJ ORIGINAL SHORTBREAD.png", "DJ PISTACHIO COOKIES DISPLAY.png", 
"DJ PISTACHIO COOKIES.png", "DJ Plutoo Candy Markup.png", "DJ SHORT BREAD COOKIES.png", 
"DJ SHORTBREAD DELICIOUS COOKIES DISPLAY.png", "DJ STARVIBE AI.png", "DJ SUPERB COOKIES.png", 
"DJ Starvibe Markup.png", "DJ Superb Plus Cookies.png", "DJ TAMARIND BLAST MARKUP.png", 
"DJ TANGY TAMARIND Markup.png", "DJ Wafers Chocolate.png", "DJ Wafers Strawberry.png", "DJ Wafers Vanilla.png", 
"DJ Whistle Lollipops Markup.png", "DJ Yogurt Pop Lollipop Markup.png", "Maravila ChocolatevMarkup.png", 
"Maravila Orange Markup.png", "Maravila StrawberryMarkup.png", "Maravilha Vanilla Markup.png", 
"Maravilha combine markup.png", "TICK TICK FRUITY MILKY.png", "TICK TICK LEMON.png", "TICK TICK LYCHEE.png", 
"TICK TICK MENTHOL.png", "TICK TICK PEANUT.png", "TICK TICK TAMARIND.png"
];

function determineCategory(name) {
    const nameLow = name.toLowerCase();
    if (nameLow.includes('pop') || nameLow.includes('lollipop')) {
        if (nameLow.includes('butter pop') || nameLow.includes('color pop')) {
            return 'Candies & Toffees';
        }
        return 'Lollipops';
    }
    if (nameLow.includes('wafer') || nameLow.includes('maravilha') || nameLow.includes('maravila')) {
        return 'Wafers';
    }
    if (nameLow.includes('biscuit') || nameLow.includes('cookie') || nameLow.includes('cream') || nameLow.includes('cremo') || nameLow.includes('shortbread') || nameLow.includes('nice') || nameLow.includes('glucose') || nameLow.includes('boost') || nameLow.includes('superb')) {
        return 'Cookies & Biscuits';
    }
    if (nameLow.includes('gum') || nameLow.includes('bubble')) {
        return 'Bubble Gum';
    }
    return 'Candies & Toffees';
}

function determineName(name) {
    return name.replace('.png', '')
        .replace(/Markup/gi, '')
        .replace(/Combine/gi, '')
        .replace(/DISPLAY/gi, '')
        .replace(/AI/gi, '')
        .replace(/Jar/gi, '')
        .replace(/Pouch/gi, '')
        .replace('vMarkup', '')
        .trim()
        .replace(/\s+/g, ' ');
}

let out = [];
let idCnt = 100;

for (let f of files) {
    if (["1.png", "2.png", "about.png", "file.png", "girl.png", "globe.png", "hero.png", "next.png", "vercel.png", "window.png", "TREE-INDIA-LOGO-CDR.png"].includes(f)) {
        continue;
    }
    
    let c = determineCategory(f);
    let n = determineName(f);
    
    out.push({
        id: idCnt,
        name: n,
        category: c,
        image: `/transparent/${f}`,
        specs: "Export Grade",
        price: "Standard Unit"
    });
    idCnt++;
}

fs.writeFileSync('output_products.json', JSON.stringify(out, null, 2));
console.log('done');
