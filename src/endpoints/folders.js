export function api(client) {
  return {
    async list({ projectKey, itemType, startAt = 0, maxResults = 100 } = {}) {
      if (!projectKey) throw new Error('projectKey is required');
      return client._request('/v2/folders', { query: { projectKey, itemType, startAt, maxResults } });
    },
    async get(id) {
      if (!id) throw new Error('id is required');
      return client._request(`/v2/folders/${encodeURIComponent(id)}`);
    },
    async create(body) {
      if (!body?.projectKey || !body?.name || !body?.itemType) {
        throw new Error('projectKey, name and itemType are required');
      }
      return client._request('/v2/folders', { method: 'POST', body });
    },
    async update(id, body) {
      if (!id) throw new Error('id is required');
      return client._request(`/v2/folders/${encodeURIComponent(id)}`, { method: 'PUT', body });
    },
    async remove(id) {
      if (!id) throw new Error('id is required');
      return client._request(`/v2/folders/${encodeURIComponent(id)}`, { method: 'DELETE' });
    }
  };
}
