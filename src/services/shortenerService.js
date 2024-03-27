import { nanoid } from 'nanoid';
import urlModel from '../models/urlModel.js';

class ShortenerService {
  encode(originalUrl) {
    const shortPath =  nanoid(8)
    const shortUrl = `http://short.url/${shortPath}`;
    urlModel.addUrl(shortPath, originalUrl); 
    return shortUrl;
  }

  decode(shortPath) {
    return urlModel.getUrl(shortPath);
  }

  getStats(shortPath) {
    return urlModel.getStats(shortPath);
  }
}

export default new ShortenerService();
