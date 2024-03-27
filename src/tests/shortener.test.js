const request = require('supertest');
const express = require('express');
const app = express();

app.use(express.json());
const shortenerController = require('../controllers/shortenerController');

app.post('/encode', shortenerController.encode);
app.post('/decode', shortenerController.decode);
app.get('/statistic/:urlPath', shortenerController.statistic);

describe('ShortLink URL Shortening Service', () => {
  it('should encode a URL and return a short URL', async () => {
    const response = await request(app)
      .post('/encode')
      .send({ originalUrl: 'https://example.com' });

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('shortUrl');
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

});

