var Dgeni = require('dgeni');

var packages = [require('./static-content-site'), require('./handlebars')];

var generatorPackage = new Dgeni.Package('siteGenerator', packages);

//export a Dgeni package
module.exports = generatorPackage;