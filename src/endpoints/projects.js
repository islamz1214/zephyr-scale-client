export function api(client) {
  return {
    async list({ startAt = 0, maxResults = 100 } = {}) {
      return client._request('/v2/projects', { query: { startAt, maxResults } });
    },
    async get(projectKey) {
      if (!projectKey) throw new Error('projectKey is required');
      return client._request(`/v2/projects/${encodeURIComponent(projectKey)}`);
    }
  };
}
