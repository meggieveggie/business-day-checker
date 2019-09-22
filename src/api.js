import 'dotenv/config';
import express from 'express';
import { formatResponse } from './helpers'
import bodyParser from 'body-parser'
import { DateTime } from "luxon"
import calculator from "business-days-calculator"

const app = express();

app.use(bodyParser.json())

app.get('/healthz', (req, res) => {
  return res.send('Received a GET HTTP method');
});

app.get('/api/v1/businessDates/*', (req, res) => {
  var data = req.query
  data.delay = parseInt(data.delay)
  res.json(formatResponse(data))
});

app.post('/api/v1/businessDates/*', (req, res) => {
  var data = req.body
  data.delay = parseInt(data.delay)
  res.json(formatResponse(data))
});

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