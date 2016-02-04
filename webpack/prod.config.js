const webpack = require('webpack');
const path = require('path');
const autoprefixer = require('autoprefixer');
const WebpackIsomorphicTools = require('webpack-isomorphic-tools');
const CleanPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

// https://github.com/halt-hammerzeit/webpack-isomorphic-tools
const WebpackIsomorphicToolsPlugin = require('webpack-isomorphic-tools/plugin');
const webpackIsomorphicToolsPlugin = new WebpackIsomorphicToolsPlugin(require('./webpack-isomorphic-tools'));

const projectRootPath = path.resolve(__dirname, '../');
const assetsPath = path.resolve(projectRootPath, './build');

module.exports = {
	cache: true,
  devtool: 'source-map',
	verbose: true,
	colors: true,
	'display-error-details': true,
	context: path.resolve(__dirname, '..'),
  progress: true,
	entry: [
		'./javascript/client/app.js'
	],
	output: {
		path: assetsPath,
    publicPath: '/',
    filename: '[name]-[hash].js',
    chunkFilename: '[name]-[chunkhash].js'
		// filename: 'bundle.js'
	},
  plugins: [
		new CleanPlugin(
			[assetsPath],
			{ root: projectRootPath }
		),

		// css files from the extract-text-plugin loader
    new ExtractTextPlugin('[name]-[chunkhash].css', {allChunks: true}),
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
		webpackIsomorphicToolsPlugin
  ],
	resolve: {
    modulesDirectories: [
      'src',
      'node_modules'
    ],
    extensions: ['', '.json', '.js', '.jsx']
  },
	progress: true,
	module: {
		loaders: [
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('style', ['css', 'resolve-url', 'sass']),
				// include: path.join(__dirname, 'sass')
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
		modules: true,			// Enables local scoped css (hash-like class names specific to components)
		importLoaders: 1,		// Which loaders should be applied to @imported resources (How many after css loader)
		sourceMap: true
	},
	sassLoader: {
		sourceMap: true,
		outputStyle: 'expanded',
		sourceMapContents: true
	},
	postcss: [
    autoprefixer({
      browsers: ['last 3 versions']
    })
  ],
};
