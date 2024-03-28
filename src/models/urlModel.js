class URLModel {
    constructor() {
        this.urls = {};
        this.stats = {};
    }

    addUrl(shortPath, originalUrl,shortUrl) {
        this.urls[shortPath] = originalUrl;
        this.stats[shortPath] = {
            accesses: 0,
            createdAt: new Date(),
            originalUrl: originalUrl,
            shortenedUrl: shortUrl
        };
        console.log('URL added:', this.urls); 

    }

    getUrl(shortPath) {
        console.log('Requested URL:', shortPath, 'Available URLs:', this.urls); // Logging available URLs
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
