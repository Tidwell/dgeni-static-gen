var renderersFactory = require('./template-renderers');
var renderers = renderersFactory();

describe('Template Renderers Service', function() {
	it('should return an object', function() {
		expect(renderers).toBeObject();
	});
});