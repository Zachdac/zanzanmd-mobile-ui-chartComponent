var http = require('http')
	querystring = require('querystring')
	url = require('url')

exports.proxy = (req, res) => {
	var param = querystring.parse(url.parse(req.url).query)

	var opt = {
		host:'192.168.1.113',
		port:'8080',
		method:'GET',
		path: `${param.path}?spShopId=${param.spShopId}`,
		headers:{
			'Authorization': param.token
		}
	}

	new Promise((reslove, reject) => {
		var body = ''
		var req = http.request(opt, function(res) {
			console.log("Got response: " + res.statusCode);

			res.on('data',function(d){
			  	body += d;
			}).on('end', function(){
			  	console.log(res.headers)
			  	console.log(body)
			  	reslove(body)
			});

		}).on('error', function(e) {
		  console.log("Got error: " + e.message);
		})
		req.end();
	}).then(body => {
		res.writeHead(200, {"Content-type": "text/plain"});
	    res.write(body);
	    res.end();
	})
}