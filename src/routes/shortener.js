import  express  from 'express';
import { encodeUrl, decodeUrl, statistics } from '../controllers/shortenerController.js';


const router = express.Router();

router.post('/encode', encodeUrl);
router.post('/decode', decodeUrl);
router.get('/statistic/:urlPath', statistics);

export default router;