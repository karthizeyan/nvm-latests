var should = require('should');
var co = require('co');
var downloader = require('../lib/getTag.js');

describe('Get latest tags from GitHub', function(){
	it('works', function(done){
		co(function* (){
			var tag = yield downloader.getLatestTag();
			tag.should.not.be.empty;
			done();
		});
	});
});