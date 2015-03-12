var app = module.exports = require('koa')();
var routes = require('koa-route');


app.use(routes.get('/', function *(){ this.body = "You're at home!"}));
app.use(routes.get('/script', function *(){ this.body = "You're at the script page!"}));

app.listen(3000);
console.log('The app is listening at port 3000');