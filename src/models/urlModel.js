class URLModel {
    constructor() {
        this.urls = {}; 
        this.stats = {}; 
    }

    addUrl(shortPath, originalUrl) {
        this.urls[shortPath] = originalUrl;
        this.stats[shortPath] = { accesses: 0, createdAt: new Date() };
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
}
export default new URLModel(); 
