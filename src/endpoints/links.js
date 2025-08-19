export function api(client) {
  return {
    async createIssueLink(testCaseKey, { issueId }) {
      if (!testCaseKey || !issueId) throw new Error('testCaseKey and issueId are required');
      return client._request(`/v2/testcases/${encodeURIComponent(testCaseKey)}/links/issues`, {
        method: 'POST',
        body: { issueId }
      });
    },
    async createWebLink(testCaseKey, { url, description }) {
      if (!testCaseKey || !url) throw new Error('testCaseKey and url are required');
      return client._request(`/v2/testcases/${encodeURIComponent(testCaseKey)}/links/weblinks`, {
        method: 'POST',
        body: { url, description }
      });
    },
    async listForTestCase(testCaseKey) {
      if (!testCaseKey) throw new Error('testCaseKey is required');
      return client._request(`/v2/testcases/${encodeURIComponent(testCaseKey)}/links`);
    },
    async deleteLink(linkId) {
      if (!linkId) throw new Error('linkId is required');
      return client._request(`/v2/links/${encodeURIComponent(linkId)}`, { method: 'DELETE' });
    }
  };
}
