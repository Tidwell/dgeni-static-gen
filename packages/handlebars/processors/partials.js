var path = require('canonical-path');

/**
 * @dgProcessor handlebarsPartialsProcessor
 * @description
 * Register handlebars partials
 */
module.exports = function handlebarsPartialsProcessor(log, templateEngine, fileReader) {
	return {
		$runAfter: ['computePathsProcessor'],
		$runBefore: ['renderDocsProcessor'],
		$process: function(docs) {
			if (!templateEngine.partialsFolder) { return docs; }

			//load partials
			var fileReaderConfig = {
				include: path.resolve(templateEngine.partialsFolder, '**/*'),
				basePath: path.resolve(templateEngine.partialsFolder),
			};
			
			return fileReader(fileReaderConfig).then(function(partialDocs) {
				partialDocs.forEach(function(doc) {
					var partialName = doc.fileName.replace('.hbs', '');
					templateEngine.handlebars.registerPartial(partialName, templateEngine.handlebars.compile(doc.content));
				});
				return docs;
			});
		}
	};
};