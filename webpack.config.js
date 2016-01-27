const webpack = require('webpack');
const path = require('path');
const autoprefixer = require('autoprefixer');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const sassLoaders = [
  'css-loader',

  'sass-loader?indentedSyntax=sass&includePaths[]=' + path.resolve(__dirname, './sass')
];

module.exports = {
	cache: true,
  devtool: 'eval',
	entry: [
    'webpack-dev-server/client?http://localhost:9000', // WebpackDevServer host and port
    'webpack/hot/only-dev-server', // 'only' prevents reload on syntax errors
		path.resolve(__dirname, 'build') + '/src/app.js',
	],
	output: {
		path: path.join(__dirname, 'build/'),
    publicPath: '/',
		filename: 'bundle.js'
	},
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
		new ExtractTextPlugin('app.css')
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
				include: path.join(__dirname, 'build')
			},
      {
        test: /\.scss$/,
        // loader: ExtractTextPlugin.extract('style-loader', sassLoaders.join('!')),
        loaders: [ 'style', 'css?sourceMap', 'sass?sourceMap', 'postcss-loader' ],
				include: path.join(__dirname, 'sass')
      }
		]
	}
};
