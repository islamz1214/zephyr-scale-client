import { listAll } from '../utils.js';

export function api(client) {
  return {
    async get(idOrKey) {
      if (!idOrKey) throw new Error('idOrKey is required');
      return client._request(`/v2/testplans/${encodeURIComponent(idOrKey)}`);
    },
    async list({ projectKey, startAt = 0, maxResults = 100, limit } = {}) {
      if (!projectKey) throw new Error('projectKey is required');
      return listAll(async (page) => {
        const q = { projectKey, startAt: startAt + page * maxResults, maxResults };
        return client._request('/v2/testplans', { query: q });
      }, { limit });
    },
    async create(body) {
      if (!body?.projectKey || !body?.name) throw new Error('projectKey and name are required');
      return client._request('/v2/testplans', { method: 'POST', body });
    },
    async update(idOrKey, body) {
      if (!idOrKey) throw new Error('idOrKey is required');
      return client._request(`/v2/testplans/${encodeURIComponent(idOrKey)}`, { method: 'PUT', body });
    },
    async remove(idOrKey) {
      if (!idOrKey) throw new Error('idOrKey is required');
      return client._request(`/v2/testplans/${encodeURIComponent(idOrKey)}`, { method: 'DELETE' });
    }
  };
}
