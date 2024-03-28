import { nanoid } from 'nanoid';
import urlModel from '../models/urlModel.js';


export function ensureFullUrl(url) {
  if (!/^https?:\/\//i.test(url)) {
    return `http://${url}`;
  }
  return url;
}

class ShortenerService {
  
  encode(originalUrl) {
    const shortPath = nanoid(8);
    const fullOriginalUrl = ensureFullUrl(originalUrl);
    const shortUrl = `http://short.url/${shortPath}`;
    urlModel.addUrl(shortPath, fullOriginalUrl, shortUrl); 
    return shortUrl;
  }

  decode(shortPath) {
    return urlModel.getUrl(shortPath);
  }

  getStats(shortPath) {
    return urlModel.getStats(shortPath);
  }
  getallUrls() {
    return urlModel.getAllUrls();
  }
}

export default new ShortenerService();
