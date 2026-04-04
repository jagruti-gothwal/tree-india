const fs = require('fs');
let products = JSON.parse(fs.readFileSync('output_products.json', 'utf8'));

const mappings = [
    { match: /BABA LOVELY POP/i, specs: "15GMS X 50 PCS X 16 PACKETS, 2200 CARTONS" },
    { match: /BABA MILK FRESH/i, specs: "8GMS X 300 PACKETS, 8100 CARTONS" },
    { match: /American Biscuits/i, specs: "70GMS X 24 PACKETS, 13,500 CARTONS" },
    { match: /Football/i, specs: "25GMS X 200 PACKETS, 3900 CARTONS" },
    { match: /CREMO/i, specs: "45GMS X 100 PACKETS, 5000 CARTONS" },
    { match: /CREAM/i, specs: "140GMS X 48 PACKETS, 2400 CARTONS" },
    { match: /Glucose/i, specs: "25GMS X 200 PACKETS, 3900 CARTONS" },
    { match: /Nice/i, specs: "8GMS X 300 PACKETS, 8100 CARTONS" },
    { match: /OLIVARY/i, specs: "1.6GMS X 220 PCS X 24 JARS, 3025 CARTONS" },
    { match: /Milk Plus/i, specs: "45GMS X 120 PACKETS, 4000 CARTONS" },
    { match: /Milk Candy/i, specs: "2.5GMS X 100 PCS X 30 PACKETS, 3450 CARTONS" },
    { match: /Mint Cool/i, specs: "2.5GMS X 100 PCS X 30 PACKETS, 3450 CARTONS" },
    { match: /Fruits/i, specs: "2.5GMS X 100 PCS X 30 PACKETS, 3450 CARTONS" },
    { match: /LOL Candy/i, specs: "4GMS X 50 PCS X 20 PACKETS, 6000 CARTONS" },
    { match: /Pluto/i, specs: "4GMS X 100 PCS X 20 PACKETS, 3100 CARTONS" },
    { match: /FruBon/i, specs: "3.5GMS X 100 PCS X 24 PACKETS, 3000 CARTONS" },
    { match: /My Milk/i, specs: "3.5GMS X 250 PCS X 8 JARS, 3000 CARTONS" },
    { match: /Chocolate Candy/i, specs: "3.5GMS X 250 PCS X 8 JARS, 3000 CARTONS" },
    { match: /Coconut Candy/i, specs: "3.5GMS X 250 PCS X 8 JARS, 3000 CARTONS" },
    { match: /Coconut Jar/i, specs: "3.5GMS X 250 PCS X 8 JARS, 3000 CARTONS" },
    { match: /Chocolate Jar/i, specs: "3.5GMS X 250 PCS X 8 JARS, 3000 CARTONS" },
    { match: /TANGY TAMARIND/i, specs: "4GMS X 50 PCS X 20 PACKETS, 6000 CARTONS" },
    { match: /TAMARIND BLAST/i, specs: "4.75GMS X 100 PCS X 20 PACKETS, 2800 CARTONS" },
    { match: /TICK TICK/i, specs: "3.5GMS X 40 PCS X 24 PACKETS, 7200 CARTONS" },
    { match: /Coconut Desire/i, specs: "4GMS X 50 PCS X 50 PACKETS, 2100 CARTONS" },
    { match: /Fruit Shots/i, specs: "4GMS X 50 PCS X 50 PACKETS, 2100 CARTONS" },
    { match: /Choco Full/i, specs: "5GMS X 50 PCS X 50 PACKETS, 2000 CARTONS" },
    { match: /Chocofull/i, specs: "5GMS X 50 PCS X 50 PACKETS, 2000 CARTONS" },
    { match: /Milk Ecl/i, specs: "4GMS X 150 PCS X 12 JARS, 3500 CARTONS" },
    { match: /Coconut Ecl/i, specs: "4GMS X 150 PCS X 12 JARS, 3500 CARTONS" },
    { match: /Choco Eclairs Pouch/i, specs: "4GMS X 100 PCS X 16 PACKETS, 4000 CARTONS" },
    { match: /Choco Ecl/i, specs: "4GMS X 150 PCS X 12 JARS, 3500 CARTONS" },
    { match: /Milk Shake/i, specs: "4.2GMS X 50 PCS X 50 PACKETS, 2100 CARTONS" },
    { match: /Starvibe/i, specs: "12GMS X 40 PCS X 12 TIFFINS, 2450 CARTONS" },
    { match: /Cocovibe/i, specs: "12GMS X 40 PCS X 12 TIFFINS, 2450 CARTONS" },
    { match: /Frenzy/i, specs: "12GMS X 40 PCS X 12 TIFFINS, 2450 CARTONS" },
    { match: /Wafers/i, specs: "180GMS X 24 PACKETS, 5000 CARTONS" },
    { match: /Maravila/i, specs: "180GMS X 24 PACKETS, 5000 CARTONS" },
    { match: /Maravilha/i, specs: "180GMS X 24 PACKETS, 5000 CARTONS" },
    { match: /Conico/i, specs: "12GMS X 60 PCS X 9 JARS, 1000 CARTONS" },
    { match: /Butter Pop/i, specs: "8GMS X 50 PCS X 20 PACKETS, 3300 CARTONS" },
    { match: /Color Pop/i, specs: "15GMS X 50 PCS X 16 PACKETS, 2200 CARTONS" },
    { match: /Gum Pop/i, specs: "15GMS X 50 PCS X 16 PACKETS, 2200 CARTONS" },
    { match: /Love Pop/i, specs: "4GMS X 50 PCS X 34 PACKETS, 3150 CARTONS" },
    { match: /Milk Pop/i, specs: "3.8GMS X 50 PCS X 20 PACKETS, 7150 CARTONS" },
    { match: /Whistle/i, specs: "5GMS X 50 PCS X 20 PACKETS, 5400 CARTONS" },
    { match: /Yogurt Pop/i, specs: "12GMS X 80 PCS X 6 BUCKETS, 3000 CARTONS" },
    { match: /Fruitoo/i, specs: "16GMS X 50 PCS X 16 PACKETS, 2000 CARTONS" },
    { match: /cookie/i, specs: "120GMS X 24 PACKETS, 4500 CARTONS" },
    { match: /shortbread/i, specs: "120GMS X 24 PACKETS, 4500 CARTONS" },
    { match: /superb/i, specs: "120GMS X 24 PACKETS, 4500 CARTONS" },
    { match: /boost/i, specs: "120GMS X 24 PACKETS, 4500 CARTONS" },
    { match: /butter and milk candy/i, specs: "2.5GMS X 100 PCS X 30 PACKETS" }
];

for (let p of products) {
    let matched = false;
    for (let m of mappings) {
        if (m.match.test(p.name)) {
            p.specs = m.specs;
            matched = true;
            break;
        }
    }
    if (!matched) {
        if (p.category === "Cookies & Biscuits") {
            p.specs = "120GMS X 24 PACKETS";
        }
    }
}

fs.writeFileSync('output_products.json', JSON.stringify(products, null, 2));

// Inject into page.tsx
const pageFile = 'src/app/products/page.tsx';
let content = fs.readFileSync(pageFile, 'utf8');

const startMarker = 'const staticProductsFallback = [';
const startIndex = content.indexOf(startMarker);
if (startIndex !== -1) {
    const subsetStr = content.substring(startIndex);
    const endIndexLocal = subsetStr.indexOf('];');
    if (endIndexLocal !== -1) {
        const endIndex = startIndex + endIndexLocal + 2;
        const newArrayContent = 'const staticProductsFallback = ' + JSON.stringify(products, null, 2) + ';';
        content = content.substring(0, startIndex) + newArrayContent + content.substring(endIndex);
        fs.writeFileSync(pageFile, content);
        console.log("Successfully injected specs updates!");
    } else {
        console.log("End marker not found");
    }
} else {
    console.log("Start marker not found");
}

