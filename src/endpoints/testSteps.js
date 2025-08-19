export function api(client) {
  return {
    async list(testCaseKey, { startAt = 0, maxResults = 100 } = {}) {
      if (!testCaseKey) throw new Error('testCaseKey is required');
      return client._request(`/v2/testcases/${encodeURIComponent(testCaseKey)}/teststeps`, {
        query: { startAt, maxResults }
      });
    },
    async create(testCaseKey, step) {
      if (!testCaseKey) throw new Error('testCaseKey is required');
      if (!step?.description) throw new Error('step.description is required');
      return client._request(`/v2/testcases/${encodeURIComponent(testCaseKey)}/teststeps`, {
        method: 'POST',
        body: step
      });
    }
  };
}
