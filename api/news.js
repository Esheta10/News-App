export default async function handler(req, res) {
  const { q = 'india' } = req.query;

  if (!process.env.NEWSAPI_KEY) {
    return res.status(500).json({
      error: 'Missing NEWSAPI_KEY environment variable',
    });
  }

  try {
    const response = await fetch(
      `https://newsapi.org/v2/everything?q=${encodeURIComponent(q)}&apiKey=${process.env.NEWSAPI_KEY}`
    );

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json(data);
    }

    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({
      error: 'Failed to fetch news from NewsAPI',
      message: error.message,
    });
  }
}
