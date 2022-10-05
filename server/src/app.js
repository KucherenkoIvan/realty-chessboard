const express = require('express');
const router = require('./routes');

const PORT = 5000;
const API_ROOT = '/api/v1/';

const app = express();

app.use(API_ROOT, router);

app.listen(PORT, async () => {
  console.log(`App running on port ${PORT}`);
});
