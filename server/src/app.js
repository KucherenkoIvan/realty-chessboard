const express = require('express');
const router = require('./routes');

const PORT = 5000;
const API_ROOT = '/api/v1/';

const app = express();

app.use((req, res, next) => {
  const initDate = new Date();
  res.on('finish', () => {
    console.log(
      req.method,
      req.url,
      new Date() - initDate,
      'ms',
      res.statusCode,
    );
  });
  next();
});

app.use(API_ROOT, router);

app.listen(PORT, async () => {
  console.log(`App running on port ${PORT}`);
});
