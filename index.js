import  express  from 'express';
import routes from './src/routes/shortener.js'

const app = express();
const port = process.env.PORT || 8000;

app.use(express.json());

app.use('/', routes);

app.get('/', (req, res) => {
  res.send('Welcome to ShortLink URL Shortening Service');
});

app.listen(port, () => {
  console.log(`ShortLink service listening at http://localhost:${port}`);
});