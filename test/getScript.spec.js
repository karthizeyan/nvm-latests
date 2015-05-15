"use strict";
let should = require('should');
let co = require('co');
let downloader = require('../lib/urlGetter.js');

describe('Url Getter', function(){
	it('fetch the latest tag of nvm', function(done){
		co(function* (){
			let tag = yield downloader.getLatestTag();
			tag.should.not.be.empty;
			done();
		});
	});
	it('downloads the entire script too', function(done){
		co(function* (){
			let script = yield downloader.getInstallScript("http://raw.githubusercontent.com/creationix/nvm/v0.24.0/install.sh");
			script.should.not.be.empty;
			done();
		});
	});
});