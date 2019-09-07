const http = require('http');
const path = require('path');
const fs = require('fs');

const config = require('./serverConfig.js'); //used ./ and .js, because it is user defined module

const server = http.createServer(Listen); //Listen is a function

server.listen(config.port,config.hostname,function(){

	console.log(`Server Running at http://${config.hostname}:${config.port}`);

});


function Listen(request,response)
{
	let req = request;	//these two lines are only for give shortcut name
	let res = response;


	console.log(req.method+' '+req.url); //print request basic on console for every request

	res.statusCode = 200;
	res.setHeader('Content-Type','text/html');

	if(config.allowedMethods.indexOf(req.method) != -1) //method matched with any one of allowedMethods
	{
		var URL;
		if(req.url == '/') URL = '/'+config.dirIndex;
		else URL = req.url;

		var filePath = path.resolve('./'+config.publicDir+URL); //absolute path of requested page
		const fileExt = path.extname(filePath);


		if(config.allowedExts.indexOf(fileExt) != -1) //page extenstion are allowed
		{
			fs.exists(filePath,function(exists){

				if(!exists){
					res.statusCode = 404;
					return res.end('404 - Page Not Found');
				}

				fs.createReadStream(filePath).pipe(res); //send bytes of requested file in responce
				res.end();
				
			});
		}
		else
		{
			res.statusCode = 422;//Unprocessable Entity
			return res.end('422 - pages extension not processable.');
		}

	}
	else
	{
		res.statusCode = 405;
		return res.end('405 - Request Method Not Allowed.');
	}

	

}