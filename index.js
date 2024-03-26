import  express  from 'express';
import { encodeUrl, decodeUrl, statistics } from './src/controllers/shortenerController.js';
const app = express();



const port = process.env.PORT || 8000;

app.use(express.json());

app.post('/encode', encodeUrl);
app.post('/decode', decodeUrl);
app.get('/statistic/:urlPath', statistics);


app.get('/', (req, res) => {
  res.send('Welcome to ShortLink URL Shortening Service');
});

app.listen(port, () => {
  console.log(`ShortLink service listening at http://localhost:${port}`);
});