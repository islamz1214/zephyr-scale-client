import { ZephyrScaleClient } from '../src/index.js';

const client = new ZephyrScaleClient({
  baseUrl: process.env.ZEPHYR_BASE_URL || 'https://api.zephyrscale.smartbear.com',
  token: process.env.ZEPHYR_TOKEN
});

const projectKey = process.env.ZEPHYR_PROJECT;
const data = await client.testCases.list({ projectKey, maxResults: 100, limit: 500 });
console.log('Fetched cases:', data.length);
console.log(data.slice(0, 2));
