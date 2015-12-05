var Dgeni = require('dgeni');

var packages = [require('./packages/static-content-site')];

var generatorPackage = new Dgeni.Package('siteGenerator', packages);

//export a Dgeni package
module.exports = generatorPackage;