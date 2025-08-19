export function api(client) {
  // Base URL for test execution endpoints
  const BASE = '/v2/testexecutions';

  return {
    /**
     * Create a new test execution
     * POST /v2/testexecutions
     *
     * @param {object} body - Test execution payload
     * Required fields: projectKey, testCaseKey, testCycleKey, statusName
     */
    async create(body) {
      const required = ['projectKey', 'testCaseKey', 'testCycleKey', 'statusName'];
      for (const k of required) {
        if (!body || !body[k]) throw new Error(`Missing required field: ${k}`);
      }
      return client._request(`${BASE}`, { method: 'POST', body });
    },

    /**
     * Get a single test execution by ID or Key
     * GET /v2/testexecutions/{testExecutionIdOrKey}
     *
     * @param {string} testExecutionIdOrKey - Execution ID or Key
     * @param {object} options - Optional params
     * @param {boolean} options.includeStepLinks - Whether to include step links
     */
    async get(testExecutionIdOrKey, { includeStepLinks = false } = {}) {
      if (!testExecutionIdOrKey) throw new Error('testExecutionIdOrKey is required');
      const qs = new URLSearchParams();
      if (includeStepLinks) qs.set('includeStepLinks', 'true');
      const url = `${BASE}/${encodeURIComponent(testExecutionIdOrKey)}${qs.toString() ? `?${qs}` : ''}`;
      return client._request(url, { method: 'GET' });
    },

    /**
     * List/search test executions with optional filters
     * GET /v2/testexecutions
     *
     * @param {object} params - Query parameters
     * Supported: projectKey, testCycle, testCase,
     * actualEndDateAfter, actualEndDateBefore,
     * includeStepLinks, maxResults, startAt
     */
    async list(params = {}) {
      const {
        projectKey,
        testCycle,
        testCase,
        actualEndDateAfter,
        actualEndDateBefore,
        includeStepLinks,
        maxResults,
        startAt
      } = params;

      const qs = new URLSearchParams();
      if (projectKey) qs.set('projectKey', projectKey);
      if (testCycle) qs.set('testCycle', testCycle);
      if (testCase) qs.set('testCase', testCase);
      if (actualEndDateAfter) qs.set('actualEndDateAfter', actualEndDateAfter);
      if (actualEndDateBefore) qs.set('actualEndDateBefore', actualEndDateBefore);
      if (includeStepLinks === true) qs.set('includeStepLinks', 'true');
      if (Number.isInteger(maxResults)) qs.set('maxResults', String(maxResults));
      if (Number.isInteger(startAt)) qs.set('startAt', String(startAt));

      const url = `${BASE}${qs.toString() ? `?${qs}` : ''}`;
      return client._request(url, { method: 'GET' });
    },

    /**
     * Get all links (issues, web links) for a test execution
     * GET /v2/testexecutions/{testExecutionIdOrKey}/links
     *
     * @param {string} testExecutionIdOrKey - Execution ID or Key
     */
    async getLinks(testExecutionIdOrKey) {
      if (!testExecutionIdOrKey) throw new Error('testExecutionIdOrKey is required');
      const url = `${BASE}/${encodeURIComponent(testExecutionIdOrKey)}/links`;
      return client._request(url, { method: 'GET' });
    },

    /**
     * Create an issue link for a test execution
     * POST /v2/testexecutions/{testExecutionIdOrKey}/links/issues
     *
     * @param {string} testExecutionIdOrKey - Execution ID or Key
     * @param {object} body - Must include issueId (number)
     */
    async createIssueLink(testExecutionIdOrKey, body) {
      if (!testExecutionIdOrKey) throw new Error('testExecutionIdOrKey is required');
      if (!body || typeof body.issueId !== 'number') {
        throw new Error('body.issueId (number) is required');
      }
      const url = `${BASE}/${encodeURIComponent(testExecutionIdOrKey)}/links/issues`;
      return client._request(url, { method: 'POST', body });
    },

    /**
     * Update a test execution
     * PUT /v2/testexecutions/{testExecutionIdOrKey}
     *
     * @param {string} testExecutionIdOrKey - Execution ID or Key
     * @param {object} body - Fields to update
     */
    async update(testExecutionIdOrKey, body) {
      if (!testExecutionIdOrKey) throw new Error('testExecutionIdOrKey is required');
      if (!body || typeof body !== 'object') throw new Error('Request body must be provided');
      return client._request(
        `${BASE}/${encodeURIComponent(testExecutionIdOrKey)}`,
        { method: 'PUT', body }
      );
    },

    /**
     * Get test steps of a test execution
     * GET /v2/testexecutions/{testExecutionIdOrKey}/teststeps
     *
     * @param {string} testExecutionIdOrKey - Execution ID or Key
     * @param {object} options - Optional params
     * @param {boolean} options.includeLinks - Include step links if true
     */
    async getSteps(testExecutionIdOrKey, { includeLinks = false } = {}) {
      if (!testExecutionIdOrKey) throw new Error('testExecutionIdOrKey is required');
      const qs = new URLSearchParams();
      if (includeLinks) qs.set('includeStepLinks', 'true');
      const url = `${BASE}/${encodeURIComponent(testExecutionIdOrKey)}/teststeps${qs.toString() ? `?${qs}` : ''}`;
      return client._request(url, { method: 'GET' });
    },

    /**
     * Update test steps of a test execution
     * PUT /v2/testexecutions/{testExecutionIdOrKey}/teststeps
     *
     * @param {string} testExecutionIdOrKey - Execution ID or Key
     * @param {Array} body - Array of step objects
     */
    async updateSteps(testExecutionIdOrKey, body) {
      if (!testExecutionIdOrKey) throw new Error('testExecutionIdOrKey is required');
      if (!Array.isArray(body)) {
        throw new Error('Request body must be an array of step objects');
      }
      return client._request(
        `${BASE}/${encodeURIComponent(testExecutionIdOrKey)}/teststeps`,
        { method: 'PUT', body }
      );
    },

    /**
     * Sync a test execution
     * POST /v2/testexecutions/{testExecutionIdOrKey}/syncTestExecution
     *
     * @param {string} testExecutionIdOrKey - Execution ID or Key
     */
    async sync(testExecutionIdOrKey) {
      if (!testExecutionIdOrKey) throw new Error('testExecutionIdOrKey is required');
      const url = `${BASE}/${encodeURIComponent(testExecutionIdOrKey)}/syncTestExecution`;
      return client._request(url, { method: 'POST' });
    }
  };
}
