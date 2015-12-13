var path = require('canonical-path');
var Package = require('dgeni').Package;

var handlebarsPackage = new Package('handlebars', [require('dgeni-packages/base')]);

handlebarsPackage
	.factory(require('./services/handlebars'))
	.factory(require('./services/template-renderers'))
	.processor(require('./processors/partials'))
	.processor(require('./processors/templates'));

module.exports = handlebarsPackage;