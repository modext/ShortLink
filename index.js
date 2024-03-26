const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Welcome to ShortLink URL Shortening Service');
});

app.listen(port, () => {
  console.log(`ShortLink service listening at http://localhost:${port}`);
});