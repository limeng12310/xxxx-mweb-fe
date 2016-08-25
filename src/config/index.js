/* eslint-disable */
let config;

if (ENV === 'default') {
  config = require('./default');
}

if (ENV === 'test') {
  config = require('./test');
}

if (ENV === 'production') {
  config = require('./production');
}

export default config;