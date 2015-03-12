var should = require('should');
var app = require('../');
var request = require('supertest').agent(app.listen());

describe('Homepage', function(){

	it('shows up nicely without errors', function(done){
		request
			.get('/')
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
});