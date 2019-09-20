import 'dotenv/config';
import express from 'express';
const app = express();

app.get('/healthz', (req, res) => {
  return res.send('Received a GET HTTP method');
});

app.listen(process.env.PORT, () =>
  console.log(`Listening on port ${process.env.PORT}!`),
);

// Export App for testing purposes
export default app;