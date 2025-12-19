const https = require('https');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const ACCESS_TOKEN = process.env.META_PAGE_ACCESS_TOKEN;
const PAGE_ID = process.env.META_PAGE_ID;
// Use known ID if .env is missing it
const KNOWN_IG_ID = '17841480010000647';
let IG_BUSINESS_ID = process.env.META_IG_BUSINESS_ID || KNOWN_IG_ID;

const API_VERSION = 'v20.0';
const BASE_URL = 'graph.facebook.com';
const QUEUE_FILE = path.join(__dirname, '../content/social-queue.json');

function log(message, type = 'INFO') {
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] [${type}] ${message}`);
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function makeRequest(method, path, body = null, params = {}) {
    return new Promise((resolve, reject) => {
        const queryParams = new URLSearchParams(params);
        queryParams.append('access_token', ACCESS_TOKEN);

        const options = {
            hostname: BASE_URL,
            path: `/${API_VERSION}${path}?${queryParams.toString()}`,
            method: method,
            headers: { 'Content-Type': 'application/json' }
        };

        const req = https.request(options, (res) => {
            let data = '';
            res.on('data', c => data += c);
            res.on('end', () => {
                let responseBody;
                try { responseBody = JSON.parse(data); } catch (e) { responseBody = data; }

                if (res.statusCode >= 400) {
                    reject({ statusCode: res.statusCode, body: responseBody });
                } else {
                    resolve(responseBody);
                }
            });
        });

        req.on('error', (e) => reject(e));
        if (body && (method === 'POST' || method === 'PUT')) req.write(JSON.stringify(body));
        req.end();
    });
}

async function getInstagramBusinessId() {
    try {
        const response = await makeRequest('GET', `/${PAGE_ID}`, null, { fields: 'instagram_business_account' });
        if (response.instagram_business_account?.id) return response.instagram_business_account.id;
        return KNOWN_IG_ID; // Fallback
    } catch (e) {
        return KNOWN_IG_ID; // Fallback on error
    }
}

async function publishPost(post) {
    log(`Processing Post: ${post.title || 'Untitled'}`);
    log(`Image: ${post.image_url}`);

    // Step 1: Create Container
    let containerId;
    try {
        const containerResponse = await makeRequest('POST', `/${IG_BUSINESS_ID}/media`, null, {
            image_url: post.image_url,
            caption: post.caption
        });

        if (containerResponse.id) {
            containerId = containerResponse.id;
            log(`  > Container Created: ${containerId}`, 'SUCCESS');
        } else {
            throw new Error('No Container ID');
        }
    } catch (error) {
        log(`  > Failed to create container: ${JSON.stringify(error.body || error)}`, 'ERROR');
        return false;
    }

    // Step 2: Publish
    try {
        // Wait briefly for container status if needed (images usually instant)
        await sleep(2000);

        const publishResponse = await makeRequest('POST', `/${IG_BUSINESS_ID}/media_publish`, null, {
            creation_id: containerId
        });

        if (publishResponse.id) {
            log(`  > PUBLISHED! Post ID: ${publishResponse.id}`, 'SUCCESS');
            return true;
        }
    } catch (error) {
        log(`  > Failed to publish: ${JSON.stringify(error.body || error)}`, 'ERROR');
        return false;
    }
    return false;
}

async function main() {
    log('--- Batch Social Publisher (Instagram) ---');

    if (!fs.existsSync(QUEUE_FILE)) {
        log(`Queue file not found: ${QUEUE_FILE}`, 'FATAL');
        process.exit(1);
    }

    const queue = JSON.parse(fs.readFileSync(QUEUE_FILE, 'utf8'));
    log(`Loaded ${queue.length} posts from queue.`);

    if (!IG_BUSINESS_ID) IG_BUSINESS_ID = await getInstagramBusinessId();
    log(`Using IG ID: ${IG_BUSINESS_ID}`);

    for (let i = 0; i < queue.length; i++) {
        const post = queue[i];
        const success = await publishPost(post);

        if (success) {
            // Optional: Mark as done in file? For now just log.
        }

        if (i < queue.length - 1) {
            log('Waiting 30 seconds before next post...', 'WAIT');
            await sleep(30000);
        }
    }

    log('--- Batch Completed ---');
}

main();
