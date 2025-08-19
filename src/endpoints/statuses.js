export function api(client) {
  return {
    async list() { return client._request('/v2/statuses'); },
    async get(id) {
      if (!id) throw new Error('id is required');
      return client._request(`/v2/statuses/${encodeURIComponent(id)}`);
    }
  };
}
