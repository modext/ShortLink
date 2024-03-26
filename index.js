const express = require('express');
const app = express();
const shortenerController = require('./src/controllers/shortenerController');



const port = process.env.PORT || 8000;

app.use(express.json());

app.post('/encode', shortenerController.encode);
app.post('/decode', shortenerController.decode);
app.get('/statistic/:urlPath', shortenerController.statistic);


app.get('/', (req, res) => {
  res.send('Welcome to ShortLink URL Shortening Service');
});

app.listen(port, () => {
  console.log(`ShortLink service listening at http://localhost:${port}`);
});