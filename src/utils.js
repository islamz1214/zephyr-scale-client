export async function listAll(pager, { limit } = {}) {
  const out = [];
  let page = 0;
  while (true) {
    const { values = [], items = [], next } = await pager(page++);
    const batch = values.length ? values : items;
    out.push(...batch);
    if ((limit && out.length >= limit) || !next || batch.length === 0) break;
  }
  return limit ? out.slice(0, limit) : out;
}
