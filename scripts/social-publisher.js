const https = require('https');
require('dotenv').config();

const PAGE_ID = process.env.META_PAGE_ID;
const ACCESS_TOKEN = process.env.META_PAGE_ACCESS_TOKEN;
// Use known ID if .env is missing it, based on previous discovery
const KNOWN_IG_ID = '17841480010000647';
let IG_BUSINESS_ID = process.env.META_IG_BUSINESS_ID || KNOWN_IG_ID;

const API_VERSION = 'v20.0';
const BASE_URL = 'graph.facebook.com';

// Content to post
// Fallback to a valid public image if the specific one is missing/broken
const TARGET_IMAGE_URL = 'https://detailingprime.com.br/img/antes-depois.jpg';
const PLACEHOLDER_IMAGE_URL = 'https://images.unsplash.com/photo-1601362840469-51e4d8d58785?ixlib=rb-4.0.3&auto=format&fit=crop&w=1080&q=80'; // Car detailing related
const IMAGE_URL = PLACEHOLDER_IMAGE_URL; // FORCING VALID IMAGE FOR TEST

const CAPTION = `Antes e depois 🚗✨
Detalhamento profissional com brilho extremo.
Agende agora! (Teste de Automação)`;

function log(message, type = 'INFO') {
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] [${type}] ${message}`);
}

async function makeRequest(method, path, body = null, params = {}) {
    return new Promise((resolve, reject) => {
        const queryParams = new URLSearchParams(params);
        if (body && method === 'GET') {
            // GET requests typically don't have body, putting in params if needed, but Graph API usually uses params
        }

        // Append access_token to all requests
        queryParams.append('access_token', ACCESS_TOKEN);

        const options = {
            hostname: BASE_URL,
            path: `/${API_VERSION}${path}?${queryParams.toString()}`,
            method: method,
            headers: {
                'Content-Type': 'application/json',
            }
        };

        const req = https.request(options, (res) => {
            let data = '';
            res.on('data', (chunk) => data += chunk);
            res.on('end', () => {
                let responseBody;
                try {
                    responseBody = JSON.parse(data);
                } catch (e) {
                    responseBody = data;
                }

                if (res.statusCode >= 400) {
                    // Check for specific error codes
                    if (responseBody.error) {
                        const code = responseBody.error.code;
                        if (code === 190) {
                            log(`INVALID TOKEN (Error 190): ${responseBody.error.message}`, 'FATAL');
                            process.exit(1);
                        }
                        if (code === 10 || code === 200) {
                            log(`PERMISSION ERROR (Error ${code}): ${responseBody.error.message}`, 'ERROR');
                        }
                    }
                    // Log details but reject mainly
                    reject({ statusCode: res.statusCode, body: responseBody });
                } else {
                    resolve(responseBody);
                }
            });
        });

        req.on('error', (e) => {
            log(`Network Request Error: ${e.message}`, 'FATAL');
            reject(e);
        });

        if (body && (method === 'POST' || method === 'PUT')) {
            req.write(JSON.stringify(body));
        }

        req.end();
    });
}

async function getInstagramBusinessId() {
    log('Fetching Instagram Business ID linked to Page...');
    try {
        const response = await makeRequest('GET', `/${PAGE_ID}`, null, {
            fields: 'instagram_business_account'
        });

        if (response.instagram_business_account && response.instagram_business_account.id) {
            log(`Found IG Business ID: ${response.instagram_business_account.id}`, 'SUCCESS');
            return response.instagram_business_account.id;
        }
        return null;
    } catch (error) {
        log(`Discovery Failed (likely permissions). Using fallback/known ID.`, 'WARNING');
        return KNOWN_IG_ID;
    }
}

async function publishToInstagram() {
    if (!IG_BUSINESS_ID) {
        log('Skipping Instagram Post: No IG Business ID available.', 'WARNING');
        return;
    }

    log(`Starting Instagram Post to ${IG_BUSINESS_ID}...`);

    // Step 1: Create Container
    let containerId;
    try {
        log('Creating Media Container...');
        const containerResponse = await makeRequest('POST', `/${IG_BUSINESS_ID}/media`, null, {
            image_url: IMAGE_URL,
            caption: CAPTION
        });

        if (containerResponse.id) {
            containerId = containerResponse.id;
            log(`Container Created. ID: ${containerId}`, 'SUCCESS');
        } else {
            throw new Error('No Container ID returned');
        }
    } catch (error) {
        log(`Failed to create IG Media Container: ${JSON.stringify(error.body || error)}`, 'ERROR');
        return;
    }

    // Step 2: Publish Container
    try {
        log(`Publishing Container ${containerId}...`);
        const publishResponse = await makeRequest('POST', `/${IG_BUSINESS_ID}/media_publish`, null, {
            creation_id: containerId
        });

        if (publishResponse.id) {
            log(`Instagram Post Published! ID: ${publishResponse.id}`, 'SUCCESS');
            return publishResponse;
        }
    } catch (error) {
        log(`Failed to publish IG Media: ${JSON.stringify(error.body || error)}`, 'ERROR');
    }
}

async function main() {
    log('--- Social Media Automation Started (Instagram Only) ---');
    log(`Configuration: Page ID: ${PAGE_ID}`);
    log(`Target Image: ${IMAGE_URL}`);

    if (!ACCESS_TOKEN) {
        log('Missing META_PAGE_ACCESS_TOKEN. Please check .env file.', 'FATAL');
        process.exit(1);
    }

    if (!IG_BUSINESS_ID) {
        IG_BUSINESS_ID = await getInstagramBusinessId();
    } else {
        log(`Using configured IG Business ID: ${IG_BUSINESS_ID}`);
    }

    log('--- Executing Workflows ---');

    // Instagram attempt
    await publishToInstagram();

    log('--- Automation Completed ---');
}

main();
