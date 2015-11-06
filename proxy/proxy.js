var http = require('http'),
httpProxy = require('http-proxy'),
proxy = httpProxy.createProxyServer({}),
url = require('url');

http.createServer(function(req,res){
	var hostname = req.headers.host.split(":")[0];
	var pathname = url.parse(req.url).pathname;

	console.log(hostname);
	console.log(pathname);

	switch(hostname)
	{
		case 'apps.skirmisher.com':
			proxy.web(req,res, {target: 'http://104.131.161.173:3002'});
			break
		case 'swords.skirmisher.com':
			proxy.web(req,res,{target: 'http://104.131.161.173:3001'});
			break
	}
}).listen(80, function(){
	console.log("Started proxy on port 80");
});
