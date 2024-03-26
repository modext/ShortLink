import { nanoid } from 'nanoid';
import urlModel from '../models/urlModel.js';

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

export default new ShortenerService();
