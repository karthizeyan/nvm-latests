var app = module.exports = require('koa')();
var config = require('./config')();
var routes = require('koa-route');
var render = require('./lib/render')


app.use(routes.get('/', function *(){ this.body = yield render('home.html') }));
app.use(routes.get('/script', function *(){ this.body = "You're at the script page!"}));

// start it
app.listen(config.port);
console.log("The app is stared. Listening on port "+ config.port);
console.log("This is the configuration we're running:")
console.log(config);