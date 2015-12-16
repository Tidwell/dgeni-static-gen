var handlebarsPackage = require('./');
var mockPackage = require('./mocks/mock-package');
var Dgeni = require('dgeni');
var path = require('canonical-path');

describe('handlebars package', function() {
	it("should be instance of Package", function() {
		expect(handlebarsPackage instanceof Dgeni.Package).toBeTruthy();
	});
});