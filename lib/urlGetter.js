"use strict";
var rest = require('restler');

var getLatestTag = function(){
	return function(done){
		var URL = 'https://api.github.com/repos/creationix/nvm/tags';

		rest.get(URL)
			.on('complete', function(tags) {
				var latestsTag = tags[0].name;
				done(null, latestsTag);
			});
	};
};
module.exports.getLatestTag = getLatestTag;

var getInstallScript = function(url){
	return function(done){
		rest.get(url)
			.on('complete', function(data) {
				var script = data;
				done(null, script);
			});
	};
};
module.exports.getInstallScript = getInstallScript;