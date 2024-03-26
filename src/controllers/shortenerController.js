const shortenerService = require('../services/shortenerService');

const encode = (req, res) => {
  const { originalUrl } = req.body;
  const shortUrl = shortenerService.encode(originalUrl);
  res.json({ originalUrl, shortUrl });
};

const decode = (req, res) => {
  const { shortUrl } = req.body;
  const originalUrl = shortenerService.decode(shortUrl);
  if (originalUrl) {
    res.json({ shortUrl, originalUrl });
  } 
};

const statistic = (req, res) => {
  const { urlPath } = req.params;
  const stats = shortenerService.getStats(urlPath);
  if (stats) {
    res.json({ urlPath, stats });
  } 
};

module.exports = {
  encode,
  decode,
  statistic
};
