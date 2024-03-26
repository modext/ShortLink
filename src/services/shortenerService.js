const urlModel = require('../models/urlModel');

class ShortenerService {
  encode(originalUrl) {
    const shortUrl = this._generateShortUrl();
    urlModel.addUrl(shortUrl, originalUrl);
    return shortUrl;
  }

  decode(shortUrl) {
    return urlModel.getUrl(shortUrl);
  }

  getStats(shortUrl) {
    return urlModel.getStats(shortUrl);
  }

  _generateShortUrl() {
    return Math.random().toString(36).substr(2, 8);
  }
}

module.exports = new ShortenerService();
