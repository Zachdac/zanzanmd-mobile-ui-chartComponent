var http = require('http')
	url = require('url')
	fs = require('fs')
	path = require('path')
	fsload = require('./fsload')

var baseUrl = './dist'
var a = 1

var server = (router, handle) => {
	var func = (req, res) => {
		var pathname = url.parse(req.url).pathname
		var extname = path.extname(pathname)
		var type = extname.slice(1)
		var realPath = baseUrl + pathname

		if (!pathname.indexOf('/favicon.ico')) {
	        return
	    }
		// console.log(pathname)

        if ( extname === '' ) {    
        	router(handle, pathname, req, res)        	   
        } else { 
            fsload.fsload(realPath, type, req, res);    
        }
	}

	http.createServer(func).listen(8094)
	console.log('--- http server at localhost:8094')
}


exports.start = server