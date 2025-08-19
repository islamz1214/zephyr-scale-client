import { listAll } from '../utils.js';

export function api(client) {
  return {
    async get(key) {
      if (!key) throw new Error('key is required');
      return client._request(`/v2/testcases/${encodeURIComponent(key)}`);
    },
    async list({ projectKey, startAt = 0, maxResults = 100, limit = 500 } = {}) {
      if (!projectKey) throw new Error('projectKey is required');
      return listAll(async (page) => {
        const q = { projectKey, startAt: startAt + page * maxResults, maxResults };
        return client._request('/v2/testcases', { query: q });
      }, { limit });
    }
  };
}
