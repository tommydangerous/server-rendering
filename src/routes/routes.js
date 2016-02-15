// Libs
import bodyParser from 'body-parser';
import express from 'express';

// Utils
import envelope from '../utils/envelope';

// Parse application/json
const jsonParser = bodyParser.json();
const router = express.Router();

router.get('/health', (req, res) => {
  res.sendStatus(200);
});

router.post('/render', jsonParser, (req, res) => {
  res.json(envelope(req));
});

router.get('/test/render', (req, res) => {
  if (process.env.NODE_ENV === 'development') {
    res.json(envelope(req));
  } else {
    res.sendStatus(404);
  }
});

export default router;
