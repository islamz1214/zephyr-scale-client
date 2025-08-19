export function api(client) {
  return {
    async createExecutionResult(body) {
      return client._request('/v2/automations/executions', { method: 'POST', body });
    }
  };
}
