
const webPackServer = require('./javascript/server/webpack-server').default;
const apiServer = require('./javascript/server/backend-server').default;

const PORT = process.env.PORT || 8080;
const PROD = process.env.NODE_ENV === 'production';

/**
 * Define isomorphic constants.
 */
global.__CLIENT__ = false;
global.__SERVER__ = true;
global.__DISABLE_SSR__ = false;  // <----- DISABLES SERVER SIDE RENDERING FOR ERROR DEBUGGING
global.__DEVELOPMENT__ = process.env.NODE_ENV !== 'production';

var WebpackIsomorphicTools = require('webpack-isomorphic-tools');
global.webpackIsomorphicTools = new WebpackIsomorphicTools(require('./webpack/webpack-isomorphic-tools'))
  .development(__DEVELOPMENT__)
  .server(__dirname, function() {

    if (PROD) {
      apiServer(PORT);
    } else {
      apiServer(PORT - 1);
      webPackServer(PORT);
    }

  });

// webPackServer(PORT);
