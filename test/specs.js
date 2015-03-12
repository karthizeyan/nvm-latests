var should = require('should');
var app = require('../');
var request = require('supertest').agent(app.listen());

describe('Homepage', function(){

	it('serves up a nice html page without errors', function(done){
		request
			.get('/')
			.expect('Content-Type', /html/)
			.expect(200, done);
	});

	it('has some information about nvm-latests', function(done){
		request
			.get('/')
			.expect(function(res){
				res.text.should.containEql("nvm-latests");
			})
			.end(done);
	});

	it('prints the latest script', function(done){
		request
			.get('/')
			.expect(function(res){
				res.text.should.containEql("/script | bash</code>");
			})
			.end(done);
	});

	it('has a link to the latests script', function(done){
		request
			.get('/')
			.expect(function(res){
				res.text.should.containEql("href='/script'");
			})
			.end(done);
	});

	it('has buttons to copy commands', function(done){
		request
			.get('/')
			.expect(function(res){
				res.text.should.containEql("id='copy-button-sudo-curl'");
				res.text.should.containEql("id='copy-button-curl'");
			})
			.end(done);
	});
});