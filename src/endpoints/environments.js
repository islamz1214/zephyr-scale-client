export function api(client) {
  return {
    async list({ startAt = 0, maxResults = 100 } = {}) {
      return client._request('/v2/environments', { query: { startAt, maxResults } });
    },
    async create(body) {
      if (!body?.name) throw new Error('name is required');
      return client._request('/v2/environments', { method: 'POST', body });
    }
  };
}
