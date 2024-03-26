class URLModel {
    constructor() {
        this.urls = {}; 
        this.stats = {}; 
    }

    addUrl(shortUrl, originalUrl) {
        this.urls[shortUrl] = originalUrl;
        this.stats[shortUrl] = { accesses: 0, createdAt: new Date() };
    }

    getUrl(shortUrl) {
        if (this.stats[shortUrl]) {
            this.stats[shortUrl].accesses++;
        }
        return this.urls[shortUrl];
    }

    getStats(shortUrl) {
        return this.stats[shortUrl];
    }
}

module.exports = new URLModel(); 
