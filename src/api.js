import 'dotenv/config';
import express from 'express';
import { formatResponse } from './helpers'
import bodyParser from 'body-parser'
import { DateTime } from "luxon"
import calculator from "business-days-calculator"

const app = express();

app.use(bodyParser.json())

/**
 * Endpoint to check health of application
 */
app.get('/healthz', (req, res) => {
  return res.send('Received a GET HTTP method');
});

/**
 * Endpoint to GET business date information
 */
app.get('/api/v1/businessDates/*', (req, res) => {
  var data = req.query
  data.delay = parseInt(data.delay)
  res.json(formatResponse(data))
});

/**
 * Endpoint to POST business date information
 */
app.post('/api/v1/businessDates/*', (req, res) => {
  var data = req.body
  data.delay = parseInt(data.delay)
  res.json(formatResponse(data))
});

/**
 * Endpoint to check if the date is a business day 
 */
app.get('/api/v1/isBusinessDay/', (req, res) => {
  var data = req.query
  var date = DateTime.fromISO(data.date)
  res.json({ 
    "isBusinessDay": calculator.IsBusinessDay(date.toJSDate())
  })
});

app.listen(process.env.PORT, () =>
  console.log(`Listening on port ${process.env.PORT}!`),
);

// Export App for testing purposes
export default app;