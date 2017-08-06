var server = require('./server')
	router = require('./router')
	handle = require('./requestHandler')

var handler = {}

handler['/proxy'] = handle.proxy

server.start(router.router, handler)