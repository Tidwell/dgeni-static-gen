var path = require('canonical-path');
var Package = require('dgeni').Package;

var sitePackage = new Package('staticContentSite', [require('dgeni-packages/base')]);

sitePackage
	.factory(require('./file-readers/markdown'))
	.factory(require('./services/file-reader'))

	.processor(require('./processors/split-content'))
	.processor(require('./processors/webpath'))
	.processor(require('./processors/metadata-json'))
	.processor(require('./processors/content-markdown'));

sitePackage.config(function(log, writeFilesProcessor, computePathsProcessor) {

	log.level = 'info';

	//configure the input/output file path on documents
	computePathsProcessor.pathTemplates.push({
		docTypes: ['markdown'],
		getOutputPath: function(doc) {
			var newPath = doc.fileInfo.filePath.replace(doc.fileInfo.basePath, writeFilesProcessor.outputFolder);
			return newPath.replace('.md', '.html');
		},
		getPath: function(doc) {
			return doc.fileInfo.filePath;
		}
	});
});

sitePackage.config(function(computeIdsProcessor, readFilesProcessor, markdownFileReader) {

	//configure the mapping for document ids
	computeIdsProcessor.idTemplates.push({
		docTypes: ['markdown'],
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

	readFilesProcessor.fileReaders = [markdownFileReader].concat(readFilesProcessor.fileReaders || []);
});

module.exports = sitePackage;