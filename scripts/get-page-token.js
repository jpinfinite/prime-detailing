const https = require('https');
require('dotenv').config();

const ACCESS_TOKEN = process.env.META_PAGE_ACCESS_TOKEN; // Using the provided token, which might be a User token
const API_VERSION = 'v20.0';
const BASE_URL = 'graph.facebook.com';

function log(message) {
    console.log(`[INFO] ${message}`);
}

async function makeRequest(path) {
    return new Promise((resolve, reject) => {
        const options = {
            hostname: BASE_URL,
            path: `/${API_VERSION}${path}&access_token=${ACCESS_TOKEN}`,
            method: 'GET',
        };

        const req = https.request(options, (res) => {
            let data = '';
            res.on('data', (chunk) => data += chunk);
            res.on('end', () => {
                const response = JSON.parse(data);
                if (response.error) {
                    console.error('API Error:', response.error);
                    reject(response.error);
                } else {
                    resolve(response);
                }
            });
        });

        req.on('error', reject);
        req.end();
    });
}

async function main() {
    log('Fetching Pages...');
    try {
        // Fetch pages the user manages, including their access tokens and connected IG account
        const response = await makeRequest('/me/accounts?fields=id,name,access_token,instagram_business_account');

        if (response.data && response.data.length > 0) {
            log('--- FOUND PAGES ---');
            response.data.forEach(page => {
                console.log(`\nPage Name: ${page.name}`);
                console.log(`Page ID: ${page.id}`);
                console.log(`Page Access Token: ${page.access_token}`); // Be careful logging this in prod, but needed for setup
                if (page.instagram_business_account) {
                    console.log(`IG Business ID: ${page.instagram_business_account.id}`);
                } else {
                    console.log('IG Business ID: Not linked');
                }
            });
            log('-------------------');
            log('Please update your .env file with the correct Page ID and Page Access Token from above.');
        } else {
            log('No pages found or permission denied.');
        }
    } catch (e) {
        console.error(e);
    }
}

main();
