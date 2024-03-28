import  express  from 'express';
import { encodeUrl, decodeUrl, statistics, getAllUrlsStats } from '../controllers/shortenerController.js';
import shortenerService from '../services/shortenerService.js';


const router = express.Router();

router.post('/encode', encodeUrl);
router.post('/decode', decodeUrl);
router.get('/statistic/:urlPath', statistics);

router.get('/urls', getAllUrlsStats);
router.get('/:shortPath', (req, res) => {
  const { shortPath } = req.params;
  const originalUrl = shortenerService.decode(shortPath);
  if (originalUrl) {
      res.redirect(originalUrl);
  } else {
      res.status(404).send('URL not found');
  }
});

  
export default router;