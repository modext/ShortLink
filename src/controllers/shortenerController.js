import  shortenerService  from '../services/shortenerService.js';

export const encodeUrl = (req, res) => {
  const { originalUrl } = req.body;
  if (!originalUrl) {
    return res.status(400).json({ error: 'Original URL is required.' });
  }
  const shortUrl = shortenerService.encode(originalUrl);
  res.json({ originalUrl, shortUrl });
};

export const decodeUrl = (req, res) => {
    const { shortUrl } = req.body;
    if (!shortUrl) {
      return res.status(400).json({ error: 'Short URL is required.' });
    }
    const shortPathRegex = /^http:\/\/short\.url\/([A-Za-z0-9_-]+)$/;
    const match = shortUrl.match(shortPathRegex);
    if (!match) {
      return res.status(400).json({ error: 'Invalid short URL format.' });
    }
    const shortPath = match[1]; 
    const originalUrl = shortenerService.decode(shortPath);
    if (originalUrl) {
      res.json({ shortUrl, originalUrl });
    } else {
      res.status(404).json({ error: 'URL not found.' });
    }
  };
  

export const statistics = (req, res) => {
  const { urlPath } = req.params;
  const stats = shortenerService.getStats(urlPath);
  if (stats) {
    res.json({ urlPath, stats });
  } else {
    res.status(404).json({ error: 'Stats not found for URL.' });
  }
};


