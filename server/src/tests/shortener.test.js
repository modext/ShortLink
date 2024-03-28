import request from 'supertest';
import express from 'express';
import router from '../routes/shortener.js'; 

const app = express();
app.use(express.json());
app.use(router);


describe('ShortLink URL Shortening Service', () => {
    let shortUrlPath;

    it('should encode a URL and return a short URL', async () => {
        const response = await request(app)
            .post('/encode')
            .send({ originalUrl: 'https://example.com' });

        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('shortUrl');
        const urlRegex = /^http:\/\/short\.url\/([A-Za-z0-9_-]{8})$/;
        expect(response.body.shortUrl).toMatch(urlRegex);
        const match = response.body.shortUrl.match(urlRegex);
        shortUrlPath = match[1];
    });
    it('should redirect to the original URL when visiting the short URL', async () => {
        const response = await request(app)
            .get(`/${shortUrlPath}`);

        expect(response.statusCode).toBe(302);
        expect(response.headers.location).toBe('https://example.com');
    });

    it('should decode a short URL and return the original URL', async () => {
        const encodeResponse = await request(app)
            .post('/encode')
            .send({ originalUrl: 'https://example.com' });

        const { shortUrl } = encodeResponse.body;
        const decodeResponse = await request(app)
            .post('/decode')
            .send({ shortUrl });

        expect(decodeResponse.statusCode).toBe(200);
        expect(decodeResponse.body.originalUrl).toBe('https://example.com');
    });

    it('should return statistics for a short URL', async () => {
        const response = await request(app)
            .get(`/statistic/${shortUrlPath}`);

        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('stats');
        expect(response.body.stats).toHaveProperty('accesses');
        expect(response.body.stats).toHaveProperty('createdAt');
        expect(response.body.stats.accesses).toBeGreaterThanOrEqual(1);
    });
    it('should return a 404 for statistics of a non-existent URL', async () => {
        const response = await request(app)
            .get('/statistic/nonexistent');

        expect(response.statusCode).toBe(404);
        expect(response.body.error).toBe('Stats not found for URL.');
    });
    it('should not encode a URL without an original URL', async () => {
        const response = await request(app)
            .post('/encode')
            .send({});

        expect(response.statusCode).toBe(400);
        expect(response.body.error).toBe('Original URL is required.');
    });

    it('should return a 404 when attempting to redirect a non-existent short URL', async () => {
        const response = await request(app)
            .get('/nonexistent');
        expect(response.statusCode).toBe(404);
    });

    it('should correctly handle URLs without schemes', async () => {
    const responseWithoutScheme = await request(app)
        .post('/encode')
        .send({ originalUrl: 'example.com' }); 

    expect(responseWithoutScheme.statusCode).toBe(200);
    expect(responseWithoutScheme.body).toHaveProperty('shortUrl');

    const matchWithoutScheme = responseWithoutScheme.body.shortUrl.match(urlRegex);
    expect(matchWithoutScheme).not.toBeNull();

    const shortPathWithoutScheme = matchWithoutScheme[1];
    const redirectResponse = await request(app)
        .get(`/${shortPathWithoutScheme}`);

    expect(redirectResponse.statusCode).toBe(302);
    expect(redirectResponse.headers.location).toBe('http://example.com');
});


});

