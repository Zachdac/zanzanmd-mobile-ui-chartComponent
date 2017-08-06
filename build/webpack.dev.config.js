var webpack = require('webpack')
var config = require('./webpack.base.config.js')


var baseUrl = 'http://221.215.97.83:8089'

var webpackDevServer = require('webpack-dev-server')

new webpackDevServer(webpack(config), {
	contentBase: '../dist/',
	disableHostCheck: true
}).listen(8099, 'localhost')

console.log('server run 8099')