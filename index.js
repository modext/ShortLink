import  express  from 'express';
import routes from './src/routes/shortener.js'
import cors from 'cors';


const app = express();
const port = process.env.PORT || 8000;

app.use(cors({
  origin: 'http://localhost:3001' // Adjust this to match your frontend's origin
}));

app.use(express.json());

app.use('/', routes);

app.get('/', (req, res) => {
  res.send('Welcome to ShortLink URL Shortening Service');
});

app.listen(port, () => {
  console.log(`ShortLink service listening at http://localhost:${port}`);
});