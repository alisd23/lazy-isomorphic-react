const webpack = require('webpack');
const path = require('path');
const autoprefixer = require('autoprefixer');
const WebpackIsomorphicTools = require('webpack-isomorphic-tools');

// https://github.com/halt-hammerzeit/webpack-isomorphic-tools
const WebpackIsomorphicToolsPlugin = require('webpack-isomorphic-tools/plugin');
const webpackIsomorphicToolsPlugin = new WebpackIsomorphicToolsPlugin(require('./webpack-isomorphic-tools'));

const projectRootPath = path.resolve(__dirname, '../');
const assetsPath = path.resolve(projectRootPath, './build');

module.exports = {
	cache: true,
  devtool: 'inline-source-map',
	context: path.resolve(__dirname, '..'),
  progress: true,
	entry: [
    'webpack-dev-server/client?http://localhost:9999', // WebpackDevServer host and port
    'webpack/hot/only-dev-server', // 'only' prevents reload on syntax errors
		'./javascript/client/app.js'
	],
	output: {
		path: path.join(projectRootPath, 'build/'),
		// Need absolute path for sources to work - http://stackoverflow.com/questions/30762323/webpack-must-i-specify-the-domain-in-publicpath-for-url-directive-to-work-in
    publicPath: 'http://localhost:9999/build/',
    filename: '[name]-[hash].js',
    chunkFilename: '[name]-[chunkhash].js',
	},
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
		new webpack.optimize.OccurenceOrderPlugin(),
		new webpack.NoErrorsPlugin(),
    new webpack.IgnorePlugin(/webpack-stats\.json$/),
    new webpack.DefinePlugin({
      __CLIENT__: true,
      __SERVER__: false,
      __DEVELOPMENT__: true,
      __DEVTOOLS__: true
    }),
    webpackIsomorphicToolsPlugin.development()
  ],
	postcss: [
    autoprefixer({
      browsers: ['last 3 versions']
    })
  ],
	module: {
		loaders: [
      {
				test: /\.jsx?$/,
				loaders: ['react-hot', 'jsx-loader?harmony'],
				include: path.join(projectRootPath, 'javascript')
			},
      {
        test: /\.scss$/,
        loaders: ['style', 'css?sourceMap&importLoaders=1', 'sass'],
				include: path.join(projectRootPath, 'sass')
      },
			{ test: /\.woff(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/font-woff" },
      { test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/font-woff" },
      { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/octet-stream" },
      { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: "file" },
      { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=image/svg+xml" },
		]
	},

	// LOADER config
	cssLoader: {
		sourceMap: true,
		modules: false,			// Enables local scoped css (hash-like class names specific to components)
		localIdentName: '[local]___[hash:base64:5]',		// Name format for local scoped class names (if set)
		importLoaders: 1		// Which loaders should be applied to @imported resources (How many after css loader)
	},
	sassLoader: {
		sourceMap: true,
		outputStyle: 'expanded'
	}
};
