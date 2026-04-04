const fs = require('fs');

const pageFile = 'src/app/products/page.tsx';
let content = fs.readFileSync(pageFile, 'utf8');

const outputProducts = fs.readFileSync('output_products.json', 'utf8');

const startMarker = 'const staticProductsFallback = [';
const endRegex = /\];/;

const startIndex = content.indexOf(startMarker);
if (startIndex !== -1) {
    const subsetStr = content.substring(startIndex);
    const endIndexLocal = subsetStr.indexOf('];');
    if (endIndexLocal !== -1) {
        const endIndex = startIndex + endIndexLocal + 2;
        
        const newArrayContent = 'const staticProductsFallback = ' + outputProducts + ';';
        
        content = content.substring(0, startIndex) + newArrayContent + content.substring(endIndex);
        
        fs.writeFileSync(pageFile, content);
        console.log("Successfully injected replacement!");
    } else {
        console.log("End marker not found");
    }
} else {
    console.log("Start marker not found");
}
