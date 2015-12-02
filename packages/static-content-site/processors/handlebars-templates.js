var path = require('canonical-path');
var Q = require('Q');
var _ = require('lodash');

/**
 * @dgProcessor handlebarsTemplatesProcessor
 * @description
 * Register handlebars partials
 */
module.exports = function handlebarsTemplatesProcessor(templateEngine, fileReader, templateFinder, handlebarsTemplateRenderers) {
	return {
		$runAfter: ['computePathsProcessor'],
		$runBefore: ['renderDocsProcessor'],
		$process: function(docs) {
			var templateFiles = [];
			//find all the templates used by all the docs
			docs.forEach(function(doc){
				var findTemplate = templateFinder.getFinder();
				var templateFile = findTemplate(doc);
				templateFiles.push(templateFile);
			});

			templatePromises = [];
			//generate a promise to load each template file
			templateFiles.forEach(function(templateFile){
				var fileReaderConfig = {
					include: path.resolve(templateFinder.templateFolders[0], templateFile),
					basePath: path.resolve(templateFinder.templateFolders[0]),
				};
				templatePromises.push(fileReader(fileReaderConfig));
			});

			//run them all to get every template
			return Q.all(templatePromises).then(_.flatten).then(function(templates) {
				templates.forEach(function(doc) {
					//store the compiled version of the template in the renderers service
					handlebarsTemplateRenderers[doc.fileName] = templateEngine.handlebars.compile(doc.content);
				});
				//processor done
				return docs;
			});
		}
	};
};