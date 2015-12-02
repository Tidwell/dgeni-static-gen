var Dgeni = require('dgeni');
var path = require('canonical-path');

function SiteGenerator(config) {
	var packages = [require('./packages/static-content-site')];

	this.generatorPackage = new Dgeni.Package('siteGenerator', packages);

	this.generatorPackage.config(function(writeFilesProcessor){
		writeFilesProcessor.outputFolder = path.resolve(process.cwd(), config.buildPath);
	});

	this.dgeni = new Dgeni([this.generatorPackage]);
}

SiteGenerator.prototype.generate = function() {
	this.dgeni.generate().then(function(docs) {
		console.log(docs.length, 'docs generated');
	});
};


//export a factory so there is no confusion with using 'new'
module.exports = {
	createGenerator: function(config) {
		return new SiteGenerator(config);
	}
};