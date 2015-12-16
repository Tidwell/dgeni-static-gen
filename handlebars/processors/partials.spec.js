var partialsProcessorFactory = require('./partials');
var processor = partialsProcessorFactory({},{},{});
var mockFileReaderFactory = require('../mocks/mock-file-reader.js');
var mockHandlebars = require('../mocks/mock-handlebars.js');

describe('Partials Processor', function() {
	var docs = [];
	it('should have a $process method', function() {
		expect(processor.$process).toBeFunction();
	});
	it('should not run if the partialsFolder hasn\'t been set on the templateEngine', function() {
		expect(processor.$process(docs)).toBe(docs);
	});
	it('should return a promise to find all the partials files if config is set', function() {
		var processor = partialsProcessorFactory({},{partialsFolder: 'somewhere/'},mockFileReaderFactory());
		expect(processor.$process(docs)).toBeObject();
	});
	it('should return the docs after finishing registering all partials', function(done) {
		var processor = partialsProcessorFactory({},{partialsFolder: 'somewhere/', handlebars: mockHandlebars},mockFileReaderFactory());
		var promise = processor.$process(docs).then(function(d) {
			expect(d).toBe(docs);
			done();
		});
	});
	it('should register each partial with handlebars after finding them', function(done) {
		var mockData = [{fileName: 'partial.hbs', content: 'content'}];
		var processor = partialsProcessorFactory({},{partialsFolder: 'somewhere/', handlebars: mockHandlebars},mockFileReaderFactory(mockData));
		var promise = processor.$process(docs).then(function(){
			expect(mockHandlebars.partials['partial']).toBe('content');
			done();
		});
	});
});