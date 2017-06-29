var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	devtool: 'eval-source-map',
	entry: [
		__dirname + '/app/main.js'
	],
	output: {
		path: __dirname + '/public',
		filename: 'bundle.js'
	},
	module: {
		loaders: [{
			test: /\.json$/,
			loader: "json-loader"
		}, {
			test: /\.js$/,
			exclude: /nodel_modules/,
			loader: 'babel-loader'
		}, {
			test: /\.css$/,
			loader: 'style-loader!css-loader'
		}, {
			test: /\.html$/,
			loader: 'raw-loader'
		}, {
			test: /\.(png|jpg)$/,
			loader: 'file-loader'
		}, {
			test: /\.(eot|otf|ttf|woff|woff2)\w*/,
			loader: 'file-loader'
		}]
	},
	externals: {
		jquery: 'window.$'
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: __dirname + "/app/index.temp.html"
		}),
		new webpack.HotModuleReplacementPlugin()
	],
	devServer: {
		contentBase: "./public",
		inline: true,
		historyApiFallback: true,
		hot: true
	}
}