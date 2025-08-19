export function api(client) {
  return {
    async listForTestCase(testCaseKey) {
      if (!testCaseKey) throw new Error('testCaseKey is required');
      return client._request(`/v2/testcases/${encodeURIComponent(testCaseKey)}/attachments`);
    },
    // Placeholder: real upload should use multipart/form-data
    async uploadToTestCase(testCaseKey, { filename, contentType, data }) {
      if (!testCaseKey || !data) throw new Error('testCaseKey and data are required');
      return client._request(`/v2/testcases/${encodeURIComponent(testCaseKey)}/attachments`, {
        method: 'POST',
        headers: { 'Content-Type': contentType || 'application/octet-stream' },
        body: data
      });
    }
  };
}
