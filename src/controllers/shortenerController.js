const shortenerService = require('../services/shortenerService');

const encode = (req, res) => {
  const { originalUrl } = req.body;
  if (!originalUrl) {
    return res.status(400).json({ error: 'Original URL is required.' });
  }
  const shortUrl = shortenerService.encode(originalUrl);
  res.json({ originalUrl, shortUrl });
};

const decode = (req, res) => {
  const { shortUrl } = req.body;
  if (!shortUrl) {
    return res.status(400).json({ error: 'Short URL is required.' });
  }
  const originalUrl = shortenerService.decode(shortUrl);
  if (originalUrl) {
    res.json({ shortUrl, originalUrl });
  } else {
    res.status(404).json({ error: 'URL not found.' });
  }
};

const statistic = (req, res) => {
  const { urlPath } = req.params;
  const stats = shortenerService.getStats(urlPath);
  if (stats) {
    res.json({ urlPath, stats });
  } else {
    res.status(404).json({ error: 'Stats not found for URL.' });
  }
};

module.exports = {
  encode,
  decode,
  statistic
};
