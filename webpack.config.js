var webpack = require('webpack');
var path = require('path');

module.exports = {
	cache: true,
  devtool: 'eval',
	entry: [
    'webpack-dev-server/client?http://localhost:9000', // WebpackDevServer host and port
    'webpack/hot/only-dev-server', // 'only' prevents reload on syntax errors
		path.resolve(__dirname, 'build') + '/src/app.js'
	],
	output: {
		path: path.join(__dirname, 'build/'),
    publicPath: '/',
		filename: 'bundle.js'
	},
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
	module: {
		loaders: [
      {
				test: /\.jsx?$/,
				loaders: ['react-hot', 'jsx-loader?harmony'],
				include: path.join(__dirname, 'build')
			}
		]
	}
};
