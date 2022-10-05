const fs = require('fs');
const path = require('path');

const DATA_PATH = path.resolve('data', 'data.json');

const dataString = fs.readFileSync(DATA_PATH);

module.exports = JSON.parse(dataString);
