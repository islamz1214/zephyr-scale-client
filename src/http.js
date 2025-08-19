import { HttpError } from './errors.js';

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

export async function httpRequest(url, {
  method = 'GET',
  headers = {},
  body,
  timeoutMs = 15000,
  retries = 2,
  retryInitialDelayMs = 300
} = {}) {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const res = await fetch(url, {
      method,
      headers,
      body: body && typeof body !== 'string' ? JSON.stringify(body) : body,
      signal: controller.signal
    });

    if ([429, 502, 503, 504].includes(res.status) && retries > 0) {
      const retryAfter = parseInt(res.headers.get('retry-after') || '0', 10);
      const delay = retryAfter ? retryAfter * 1000 : retryInitialDelayMs;
      await sleep(delay);
      return httpRequest(url, {
        method, headers, body, timeoutMs,
        retries: retries - 1,
        retryInitialDelayMs: Math.min(retryInitialDelayMs * 2, 5000)
      });
    }

    const text = await res.text();
    const data = text ? safeJson(text) : null;

    if (!res.ok) {
      throw new HttpError(`HTTP ${res.status} for ${url}`, {
        status: res.status, url, body: data || text
      });
    }
    return { status: res.status, headers: res.headers, data };
  } catch (err) {
    if (err.name === 'AbortError') {
      throw new HttpError(`Request timed out after ${timeoutMs}ms: ${url}`);
    }
    throw err;
  } finally {
    clearTimeout(id);
  }
}

function safeJson(s) { try { return JSON.parse(s); } catch { return null; } }
