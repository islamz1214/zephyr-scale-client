import { httpRequest } from './http.js';
import * as testCases from './endpoints/testCases.js';
import * as testExecutions from './endpoints/testExecutions.js';
import * as projects from './endpoints/projects.js';
import * as testCycles from './endpoints/testCycles.js';
import * as testPlans from './endpoints/testPlans.js';
import * as folders from './endpoints/folders.js';
import * as links from './endpoints/links.js';
import * as priorities from './endpoints/priorities.js';
import * as statuses from './endpoints/statuses.js';
import * as environments from './endpoints/environments.js';
import * as automations from './endpoints/automations.js';
import * as attachments from './endpoints/attachments.js';
import * as customFields from './endpoints/customFields.js';
import * as testSteps from './endpoints/testSteps.js';

export class ZephyrScaleClient {
  constructor({
    baseUrl,
    token,
    timeoutMs = 15000,
    retries = 2,
    retryInitialDelayMs = 300,
  } = {}) {
    if (!baseUrl) throw new Error('baseUrl is required');
    if (!token) throw new Error('token is required (Zephyr Cloud Access Token)');
    this.baseUrl = baseUrl.replace(/\/$/, '');
    this.token = token;
    this.timeoutMs = timeoutMs;
    this.retries = retries;
    this.retryInitialDelayMs = retryInitialDelayMs;

    this.testCases = testCases.api(this);
    this.testExecutions = testExecutions.api(this);
    this.projects = projects.api(this);
    this.testCycles = testCycles.api(this);
    this.testPlans = testPlans.api(this);
    this.folders = folders.api(this);
    this.links = links.api(this);
    this.priorities = priorities.api(this);
    this.statuses = statuses.api(this);
    this.environments = environments.api(this);
    this.automations = automations.api(this);
    this.attachments = attachments.api(this);
    this.customFields = customFields.api(this);
    this.testSteps = testSteps.api(this);
  }

  async _request(path, { method = 'GET', query, body, headers = {} } = {}) {
    const url = new URL(this.baseUrl + path);
    if (query) {
      Object.entries(query).forEach(([k, v]) => {
        if (v !== undefined && v !== null) url.searchParams.set(k, String(v));
      });
    }
    const res = await httpRequest(url.toString(), {
      method,
      headers: {
        'Authorization': `Bearer ${this.token}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        ...headers,
      },
      body,
      timeoutMs: this.timeoutMs,
      retries: this.retries,
      retryInitialDelayMs: this.retryInitialDelayMs
    });
    return res.data;
  }
}
