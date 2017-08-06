var htmlPlugin = require('html-webpack-plugin')
var webpack = require('webpack')
var resolve = require('path').resolve

module.exports = {
	entry: resolve(__dirname, '../src/main.js'),
	output: {
		path: resolve(__dirname, '../dist'),
		publicPath: '/',
		filename: '[name].js'
	},
	module: {
		loaders: [
			{
				test: /\.(js|jsx)$/,
				loader: 'babel-loader',
				exclude: /node_modules/
			},
			{
				test: /\.css$/,
				loader: 'style-loader!css-loader!less-loader'
			},
            {
            	test: /\.less$/,
            	loader: `style-loader!css-loader!less-loader`
            }
		]
	},
	plugins: [
		new htmlPlugin({
			template: resolve(__dirname, '../index.html')
		}),
		new webpack.LoaderOptionsPlugin({
		    minimize: true
		})
	],
	devtool: 'cheap-source-map'
}