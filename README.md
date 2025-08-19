# zephyr-scale-client

Minimal **JavaScript** client for **Zephyr Scale** REST API (Cloud). ESM-only, Node ≥18, zero dependencies.

 This client targets `https://api.zephyrscale.smartbear.com/v2`.

## Install
```bash
npm i zephyr-scale-client
```

## Quick start
```js
import { ZephyrScaleClient } from 'zephyr-scale-client';

const client = new ZephyrScaleClient({
  baseUrl: 'https://api.zephyrscale.smartbear.com',
  token: process.env.ZEPHYR_TOKEN,  // personal access token
  timeoutMs: 15000,
});

// List first 500 cases
const cases = await client.testCases.list({ projectKey: 'PROJ', maxResults: 100, limit: 500 });
console.log(cases.length);

// Create a test execution
const exec = await client.testExecutions.create({
  projectKey: 'PROJ',
  testCaseKey: 'PROJ-T1',
  testCycleKey: 'PROJ-C1',
  statusName: 'Pass'
});
console.log(exec);
```

## Namespaces (initial)
- projects
- testCases
- testExecutions
- testCycles
- testPlans
- folders
- links
- priorities
- statuses
- environments
- automations
- attachments (upload placeholder)
- customFields
- testSteps

## Config
```js
new ZephyrScaleClient({
  baseUrl: 'https://api.zephyrscale.smartbear.com',
  token: 'YOUR_TOKEN',
  timeoutMs: 15000,
  retries: 2,
  retryInitialDelayMs: 300
});
```

## Notes
- Some endpoints require specific payload shapes—consult the official docs.
- File uploads typically need `multipart/form-data` (placeholder included).
- Extend methods in `src/endpoints/*` as you go.
