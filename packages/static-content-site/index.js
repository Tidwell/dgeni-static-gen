var path = require('canonical-path');
var Package = require('dgeni').Package;

var myPackage = new Package('staticContentSite', [require('dgeni-packages/base')]);

myPackage.factory(require('./file-readers/raw'));
myPackage.factory(require('./services/file-reader'));
myPackage.factory(require('./template-engine/handlebars'));
myPackage.factory(require('./services/handlebars-template-renderers'));

myPackage.processor(require('./processors/split-content'));
myPackage.processor(require('./processors/content-markdown'));
myPackage.processor(require('./processors/handlebars-partials'));
myPackage.processor(require('./processors/handlebars-templates'));


myPackage.config(function(log, writeFilesProcessor, computePathsProcessor) {

	log.level = 'info';

	//configure the input/output file path
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

myPackage.config(function(computeIdsProcessor, readFilesProcessor, rawDocFileReader) {

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

module.exports = myPackage;