
const webPackServer = require('./server/webpack-server');
const apiServer = require('./server/backend-server');

const PORT = process.env.PORT || 8080;
const PROD = process.env.NODE_ENV === 'production';

if (PROD) {
  apiServer(PORT);
} else {
  apiServer(PORT - 1);
  webPackServer(PORT);
}
