
const webpack = require('webpack');
const config = require('../../webpack/dev.config');
const WebpackDevServer = require('webpack-dev-server');

export default (PORT) => {
  const server = new WebpackDevServer(webpack(config), {
    publicPath: config.output.publicPath,
    hot: true,
    ws: true,
    proxy: {
      '*' : `http://localhost:${PORT - 1}`
    }
  });
  server.listen(PORT, 'localhost');
  console.info('==> 🌎  Webpack server listening on port %s.', PORT);
}
