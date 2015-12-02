var path = require('canonical-path');
var Package = require('dgeni').Package;

var sitePackage = new Package('staticContentSite', [require('dgeni-packages/base')]);

sitePackage
	.factory(require('./file-readers/raw'))
	.factory(require('./services/file-reader'))
	.factory(require('./template-engine/handlebars'))
	.factory(require('./services/handlebars-template-renderers'))

	.processor(require('./processors/split-content'))
	.processor(require('./processors/content-markdown'))
	.processor(require('./processors/handlebars-partials'))
	.processor(require('./processors/handlebars-templates'));

sitePackage.config(function(log, writeFilesProcessor, computePathsProcessor) {

	log.level = 'info';

	//configure the input/output file path on documents
	computePathsProcessor.pathTemplates.push({
		docTypes: ['raw'],
		getOutputPath: function(doc) {
			var newPath = doc.fileInfo.filePath.replace(doc.fileInfo.basePath, writeFilesProcessor.outputFolder);
			return newPath.replace('.md', '.html');
		},
		getPath: function(doc) {
			return doc.fileInfo.filePath;
		}
	});
});

sitePackage.config(function(computeIdsProcessor, readFilesProcessor, rawDocFileReader) {

	//configure the mapping for document ids
	computeIdsProcessor.idTemplates.push({
		docTypes: ['raw'],
		getId: function(doc) {
			var docPath = doc.name || doc.codeName;
			if (!docPath) {
				docPath = path.dirname(doc.fileInfo.relativePath);
				docPath = path.join(docPath, doc.fileInfo.baseName);
			}
			return docPath;
		},
		getAliases: function(doc) {
			return [doc.id];
		}
	});

	readFilesProcessor.fileReaders = [rawDocFileReader].concat(readFilesProcessor.fileReaders || []);
});

module.exports = sitePackage;