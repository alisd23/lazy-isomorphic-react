const webpack = require('webpack');
const path = require('path');
const autoprefixer = require('autoprefixer');
const WebpackIsomorphicTools = require('webpack-isomorphic-tools');
const CleanPlugin = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

// https://github.com/halt-hammerzeit/webpack-isomorphic-tools
const WebpackIsomorphicToolsPlugin = require('webpack-isomorphic-tools/plugin');
const webpackIsomorphicToolsPlugin = new WebpackIsomorphicToolsPlugin(require('./webpack-isomorphic-tools'));

const projectRootPath = path.resolve(__dirname, '../');
const assetsPath = path.resolve(projectRootPath, './build');

const extractSASS = new ExtractTextPlugin('[name].css', {
	allChunks: true
});

module.exports = {
	cache: true,
  devtool: false,
	verbose: true,
	colors: true,
	'display-error-details': true,
	context: projectRootPath,
  progress: true,
	entry: ['./javascript/client/app.js'],
	output: {
		path: assetsPath,
    publicPath: '/',
    filename: '[name]-[hash].js',
    chunkFilename: '[name]-[chunkhash].js'
	},
  plugins: [
		new CleanPlugin(
			[assetsPath],
			{ root: projectRootPath }
		),
		new CopyPlugin([
			{ from: 'assets', to: 'assets' }
		]),
		// css files from the extract-text-plugin loader
    // new ExtractTextPlugin('[name]-[chunkhash].css', {allChunks: false}),
    extractSASS,
    new webpack.DefinePlugin({
      __CLIENT__: true,
      __SERVER__: false,
      __DEVELOPMENT__: false,
      __DEVTOOLS__: false,
			'process.env': {
        // Useful to reduce the size of client-side libraries, e.g. react
        NODE_ENV: JSON.stringify('production')
      }
    }),

		new webpack.IgnorePlugin(/\.\/dev/, /\/config$/),

		// optimizations
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
		new webpack.optimize.CommonsChunkPlugin({
			name: 'commons',
			filename: 'commons.js'
		}),
		webpackIsomorphicToolsPlugin
  ],
	progress: true,
	module: {
		loaders: [
      {
        test: /\.scss$/,
        loader: extractSASS.extract('style', ['css', 'resolve-url', 'sass']),
				// include: path.join(__dirname, 'sass')
      },
			{ test: /\.woff(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/font-woff" },
      { test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/font-woff" },
      { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/octet-stream" },
      { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: "file" },
      { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=image/svg+xml" },
			{ test: webpackIsomorphicToolsPlugin.regular_expression('images'), loader: 'url-loader?limit=10240' }
		]
	},

	// LOADER config
	cssLoader: {
		// modules: true,			// Enables local scoped css (hash-like class names specific to components)
		importLoaders: 1,		// Which loaders should be applied to @imported resources (How many after css loader)
		// sourceMap: true
	},
	sassLoader: {
		// sourceMap: true,
		// outputStyle: 'expanded',
		// sourceMapContents: true
	},
	postcss: [
    autoprefixer({
      browsers: ['last 3 versions']
    })
  ],
};
