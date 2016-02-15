// Libs
import express from 'express';
import React from 'react';
import ReactDOM from 'react-dom';
import ReactDOMServer from 'react-dom/server';

// Components
import Test from '../components/Test'

const router = express.Router();
const TestFactory = React.createFactory(Test);

router.get('/', (req, res) => {
  res.json({
    body: ReactDOMServer.renderToString(
      TestFactory({
        name: 'Tommy',
      })
    ),
  });
});
router.post('/', (req, res) => {
  res.json({
    body: req.body.name,
  });
});

export default router;
