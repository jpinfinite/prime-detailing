const https = require('https');
require('dotenv').config();

const USER_TOKEN = process.env.META_PAGE_ACCESS_TOKEN; // Currently holding the user token
const PAGE_ID = '884514154751409'; // The ID provided by user
const API_VERSION = 'v20.0';
const BASE_URL = 'graph.facebook.com';

async function makeRequest(path) {
    return new Promise((resolve, reject) => {
        const options = {
            hostname: BASE_URL,
            path: `/${API_VERSION}${path}&access_token=${USER_TOKEN}`,
            method: 'GET',
        };

        const req = https.request(options, (res) => {
            let data = '';
            res.on('data', (chunk) => data += chunk);
            res.on('end', () => {
                const response = JSON.parse(data);
                resolve(response);
            });
        });

        req.on('error', reject);
        req.end();
    });
}

async function main() {
    console.log(`Checking access for Page ID: ${PAGE_ID}`);
    try {
        // Try to get the page access token directly
        const response = await makeRequest(`/${PAGE_ID}?fields=access_token,name,instagram_business_account`);

        if (response.access_token) {
            console.log('SUCCESS: Found Page Access Token!');
            console.log(`Page Name: ${response.name}`);
            console.log(`Page Token: ${response.access_token}`);
            if (response.instagram_business_account) {
                console.log(`IG Business ID: ${response.instagram_business_account.id}`);
            }
        } else {
            console.log('FAILED: Could not retrieve access_token for this page.');
            console.log('Response:', JSON.stringify(response, null, 2));
        }
    } catch (e) {
        console.error(e);
    }
}

main();
