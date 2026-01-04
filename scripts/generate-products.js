const fs = require('fs');
const path = require('path');

const csvPath = path.join(process.cwd(), 'src', 'data', 'vonixx_products.csv');
const outputPath = path.join(process.cwd(), 'src', 'data', 'affiliate-products.ts');

const csvContent = fs.readFileSync(csvPath, 'utf-8');
const lines = csvContent.split('\n').filter(line => line.trim() !== '');

const headers = lines[0].split(','); // This is simple, assuming headers don't have commas

const products = [];

// Simple CSV Parser that handles quoted values containing commas
function parseCSVLine(text) {
    const result = [];
    let cell = '';
    let quote = false;

    for (let i = 0; i < text.length; i++) {
        const char = text[i];
        if (char === '"') {
            quote = !quote;
        } else if (char === ',' && !quote) {
            result.push(cell);
            cell = '';
        } else {
            cell += char;
        }
    }
    result.push(cell);
    return result;
}

for (let i = 1; i < lines.length; i++) {
    const currentLine = lines[i];
    if (!currentLine) continue;

    const values = parseCSVLine(currentLine);

    // Mapping based on: Item Id,Item Name,Price,Sales,Shop Name,Commission Rate,Commission,Product Link,Offer Link
    // Note: Parsing "39,99" to number 39.99

    if (values.length < 9) continue;

    const priceStr = values[2].replace(/"/g, '').replace(',', '.').replace('R$', '').trim();
    const commissionStr = values[6].replace(/"/g, '').replace(',', '.').replace('R$', '').trim();
    const salesStr = values[3].trim();

    const product = {
        id: values[0],
        name: values[1].replace(/"/g, '').trim(),
        price: parseFloat(priceStr),
        sales: parseInt(salesStr) || 0,
        shopName: values[4],
        commissionRate: values[5],
        commission: parseFloat(commissionStr),
        originalLink: values[7],
        affiliateLink: values[8].trim()
    };

    products.push(product);
}

// Sort by sales descending
products.sort((a, b) => b.sales - a.sales);

const fileContent = `export interface Product {
    id: string;
    name: string;
    price: number;
    sales: number;
    shopName: string;
    commissionRate: string;
    commission: number;
    originalLink: string;
    affiliateLink: string;
}

export const affiliateProducts: Product[] = ${JSON.stringify(products, null, 4)};
`;

fs.writeFileSync(outputPath, fileContent);
console.log(`Generated ${products.length} products to ${outputPath}`);
