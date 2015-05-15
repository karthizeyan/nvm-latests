"use strict";
var app = module.exports = require('koa')();
var config = require('./config')();
var routes = require('koa-route');
var serve = require('koa-static');
var render = require('./lib/render');
var getTag = require('./lib/urlGetter.js');

// configuration
app.use(serve(__dirname + '/public'));

// routes
app.use(routes.get('/', function *(){
	
	if(isCurlRequest(this)){
		let url = yield getLatestScriptUrl();
		this.body = yield getTag.getInstallScript(url);
		return;
	}
	
	let scriptUrl = "http://" + this.host;
	let curlCommand = "curl " + scriptUrl + " | bash";
	let vm = { curl : curlCommand, sudoCurl : "sudo " + curlCommand };

	this.body = yield render('home.html', vm);
}));

function *getLatestScriptUrl(){
	let tag = yield getLatestsTag();
	return `https://raw.githubusercontent.com/creationix/nvm/${tag}/install.sh`;
};

function *getLatestsTag(){
	let tag = yield getTag.getLatestTag();
	return tag;
};

function isCurlRequest(req){
	return req.get('user-agent').toLowerCase().startsWith('curl');
};


// start it
app.listen(config.port);
console.log("The app is stared. Listening on port "+ config.port);
console.log(config);