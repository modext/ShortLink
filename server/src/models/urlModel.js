import { ensureFullUrl } from "../services/shortenerService.js";

class URLModel {
    constructor() {
        this.urls = {};
        this.stats = {};
    }

    addUrl(shortPath, originalUrl,shortUrl) {
        const fullOriginalUrl = ensureFullUrl(originalUrl);
        this.urls[shortPath] = fullOriginalUrl;
        this.stats[shortPath] = {
            accesses: 0,
            createdAt: new Date(),
            originalUrl: originalUrl,
            shortenedUrl: shortUrl
        };

    }

    getUrl(shortPath) {
        if (this.urls[shortPath]) {
            this.stats[shortPath].accesses++;
            return this.urls[shortPath];
        }
        return null;
    }

    getStats(shortPath) {
        return this.stats[shortPath] || null;
    }

    getAllUrls() {
        return Object.keys(this.stats).map((shortPath) => ({
          shortPath: shortPath,
          originalUrl: this.urls[shortPath],
          stats: this.stats[shortPath],
        }));
      }
}
export default new URLModel(); 
