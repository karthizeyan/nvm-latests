var app = module.exports = require('koa')();
var config = require('./config')();
var routes = require('koa-route');
var serve = require('koa-static');
var render = require('./lib/render')

// configuration
app.use(serve(__dirname + '/public'));

// routes
app.use(routes.get('/', function *(){
	var scriptUrl = "http://" + this.host + "/script";
	var curlCommand = "curl " + scriptUrl + " | bash";
	var vm = {
		curl : curlCommand,
		sudoCurl : "sudo " + curlCommand
	};

	this.body = yield render('home.html', vm);
}));

app.use(routes.get('/script', function *(){
	this.type = 'text/plain; charset=utf-8';
	this.body = getLatestScript();
}));

// start it
app.listen(config.port);
console.log("The app is stared. Listening on port "+ config.port);
console.log("This is the configuration we're running:")
console.log(config);