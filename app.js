const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 5000;

app.use(
  bodyParser.json({
    // limit: '50mb',
    extended: false,
  })
);

app.use(bodyParser.urlencoded({ extended: false, limit: '50mb' }));

app.post('/start-scraping', (req, res, next) => {
  const data = req.body;
  console.log('payload: ', data);
  return res.status(200).send('Success');
});


/**
 * Error handler
 */
app.use((err, req, res, next) => {
  const response = {
    error: true,
    code: 500,
    message: err.message,
  };

  return res.status(response.code).send(res);
});

app.listen(PORT, () => {
  console.log('server running on port: ', PORT);
});
