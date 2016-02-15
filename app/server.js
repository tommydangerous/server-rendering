// Libs
import bodyParser from 'body-parser';
import express from 'express';
import morgan from 'morgan';

// Routes
import routes from './routes/routes';

// Environment
process.env.NODE_ENV = process.env.NODE_ENV || 'development';
// Port
const port = process.env.PORT || 8080;

// Express App
const app = express();

// Parse application/json
app.use(bodyParser.json());
// Logging
app.use(morgan('combined'));
// Routes
app.use('/', routes);

// Start server
const server = app.listen(port, () => {
  const { address, port } = server.address();
  console.log(`Server running in ${process.env.NODE_ENV} at http://${address}:${port}`);
})
