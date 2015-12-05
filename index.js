var Dgeni = require('dgeni');

var packages = [require('./packages/static-content-site'), require('./packages/handlebars')];

var generatorPackage = new Dgeni.Package('siteGenerator', packages);

//export a Dgeni package
module.exports = generatorPackage;