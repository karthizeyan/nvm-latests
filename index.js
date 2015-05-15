"use strict";
var app = module.exports = require('koa')();
var config = require('./config')();
var routes = require('koa-route');
var serve = require('koa-static');
var render = require('./lib/render');
var getTag = require('./lib/getTag.js');

// configuration
app.use(serve(__dirname + '/public'));

// routes
app.use(routes.get('/', function *(){
	// If CURL is accessing us... 
	var scriptUrl = "http://" + this.host + "/script";
	var curlCommand = "curl " + scriptUrl + " | bash";
	var vm = { curl : curlCommand, sudoCurl : "sudo " + curlCommand };

	this.body = yield render('home.html', vm);
}));

app.use(routes.get('/script', function *(){
	let url = yield getLatestScriptUrl();
	this.redirect(url);
}));

function *getLatestScriptUrl(){
	let tag = yield getLatestsTag();
	return `https://raw.githubusercontent.com/creationix/nvm/${tag}/install.sh`;
};

function *getLatestsTag(){
	// - is the tag updated within 24 hours?
	// -- no -> get the latest tag and store it
	let tag = yield getTag.getLatestTag();
	console.log(tag);
	return tag;
};

// start it
app.listen(config.port);
console.log("The app is stared. Listening on port "+ config.port);
console.log(config);