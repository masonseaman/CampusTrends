var port = process.env.PORT || 3000;

var http = require('http');

http.createServer(function (request, response){
	response.writeHead(200, {"Content-Type": "text/plain"})
	response.end("Hello World\n")
}).listen(proces.env.PORT);
