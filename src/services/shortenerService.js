const { nanoid } = require('nanoid');
const urlModel = require('../models/urlModel');

class ShortenerService {
  encode(originalUrl) {
    const shortUrl = nanoid(8);
    urlModel.addUrl(shortUrl, originalUrl);
    return shortUrl;
  }

  decode(shortUrl) {
    return urlModel.getUrl(shortUrl);
  }

  getStats(shortUrl) {
    return urlModel.getStats(shortUrl);
  }
}

module.exports = new ShortenerService();
