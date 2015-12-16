var partialsProcessorFactory = require('./templates');
var processor = partialsProcessorFactory({},{},{},{});
var mockFileReaderFactory = require('../mocks/mock-file-reader.js');
var mockHandlebars = require('../mocks/mock-handlebars.js');
var mockTemplateFinder = require('../mocks/mock-template-finder.js');

describe('Templates Processor', function() {
	var docs = [];
	it('should have a $process method', function() {
		expect(processor.$process).toBeFunction();
	});
	it('should return a promise to find all the template files', function() {
		var processor = partialsProcessorFactory({},mockFileReaderFactory(),{},{});
		expect(processor.$process(docs)).toBeObject();
	});
	it('should return the docs after finishing registering all templates', function(done) {
		var processor = partialsProcessorFactory({},mockFileReaderFactory(),{},{});
		processor.$process(docs).then(function(d){
			expect(d).toBe(docs);
			done();
		});
	});
	it('should register each compiled template after finding them', function(done) {
		var mockHandlebarsTemplateRenderers = {};
		var mockTemplateEngine = { partialsFolder: 'somewhere/', handlebars: mockHandlebars };
		var mockData = [{fileName: 'default.hbs', content: '{{template}}'}];
		var processor = partialsProcessorFactory(mockTemplateEngine, mockFileReaderFactory(mockData), mockTemplateFinder, mockHandlebarsTemplateRenderers);
		var docs = [{template: 'default.hbs'}];
		processor.$process(docs).then(function() {
			expect(mockHandlebarsTemplateRenderers['default.hbs']).toBe('{{template}}');
			done();
		});
	});
	it('should register multiple templates', function(done) {
		var mockHandlebarsTemplateRenderers = {};
		var mockTemplateEngine = { partialsFolder: 'somewhere/', handlebars: mockHandlebars };
		var mockData = [{fileName: 'default.hbs', content: '{{template}}'},{fileName: 'other.hbs', content: '{{other}}'}];
		var processor = partialsProcessorFactory(mockTemplateEngine, mockFileReaderFactory(mockData), mockTemplateFinder, mockHandlebarsTemplateRenderers);
		var docs = [{template: 'default.hbs'},{template: 'other.hbs'}];
		processor.$process(docs).then(function() {
			expect(mockHandlebarsTemplateRenderers['default.hbs']).toBe('{{template}}');
			expect(mockHandlebarsTemplateRenderers['other.hbs']).toBe('{{other}}');
			done();
		});
	});
});