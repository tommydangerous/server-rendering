import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    body: 'hey',
  });
});

export default router;
