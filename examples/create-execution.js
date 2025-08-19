import { ZephyrScaleClient } from '../src/index.js';

const client = new ZephyrScaleClient({
  baseUrl: process.env.ZEPHYR_BASE_URL || 'https://api.zephyrscale.smartbear.com',
  token: process.env.ZEPHYR_TOKEN
});

const body = {
  projectKey: process.env.ZEPHYR_PROJECT,
  testCaseKey: 'PROJ-T1',
  testCycleKey: 'PROJ-C1',
  statusName: 'Pass'
};

const res = await client.testExecutions.create(body);
console.log(res);
