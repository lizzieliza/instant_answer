export default async function handler(req, res) {
  const { q } = req.query;

  if (!q) {
    return res.status(400).json({ error: 'Query kosong' });
  }

  try {
    const apiUrl = `https://api.duckduckgo.com/?q=${encodeURIComponent(q)}&format=json&no_redirect=1&no_html=1`;

    const ddgRes = await fetch(apiUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
        'Accept': 'application/json',
        'DNT': '1',
        'Referer': 'https://duckduckgo.com/'
      }
    });

    if (!ddgRes.ok) {
      return res.status(500).json({ error: 'Gagal menghubungi DuckDuckGo' });
    }

    const data = await ddgRes.json();

    res.setHeader('Access-Control-Allow-Origin', '*');
    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json({
      error: 'Terjadi kesalahan saat mengambil data',
      detail: err.message
    });
  }
}
