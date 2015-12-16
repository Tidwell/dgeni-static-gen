var helper = require('./json.js');
var handlebarsMock = require('../mocks/mock-handlebars.js');
helper(handlebarsMock);

describe('Handlebars json helper', function() {
	it('should strinfigy what is passed to it', function() {
		expect(handlebarsMock.helpers.json({foo:'bar'})).toBe('{"foo":"bar"}');
	});
});