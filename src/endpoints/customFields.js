export function api(client) {
  return {
    async list({ entityType } = {}) {
      return client._request('/v2/customfields', { query: { entityType } });
    }
  };
}
