export function api(client) {
  return {
    async create(body) {
      const required = ['projectKey', 'testCaseKey', 'testCycleKey', 'statusName'];
      for (const k of required) {
        if (!body || !body[k]) throw new Error(`Missing required field: ${k}`);
      }
      return client._request('/v2/testexecutions', { method: 'POST', body });
    }
  };
}
