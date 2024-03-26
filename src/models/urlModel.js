class URLModel {
    constructor() {
        this.urls = {}; 
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

}

module.exports = new URLModel(); 
