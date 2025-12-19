const https = require('https');
require('dotenv').config();

const ACCESS_TOKEN = process.env.META_PAGE_ACCESS_TOKEN;
const API_VERSION = 'v20.0';
const BASE_URL = 'graph.facebook.com';

function log(message) {
    console.log(message);
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
                resolve(response);
            });
        });

        req.on('error', reject);
        req.end();
    });
}

async function main() {
    console.log('--- DEBUG TOKEN ---');
    try {
        // 1. Who am I?
        const me = await makeRequest('/me?fields=id,name');
        console.log('ME:', JSON.stringify(me, null, 2));

        // 2. What permissions do I have?
        const permissions = await makeRequest('/me/permissions?');
        console.log('PERMISSIONS:', JSON.stringify(permissions, null, 2));

        // 3. Try Accounts again
        const accounts = await makeRequest('/me/accounts?fields=id,name,access_token');
        console.log('ACCOUNTS:', JSON.stringify(accounts, null, 2));

    } catch (e) {
        console.error(e);
    }
}

main();
