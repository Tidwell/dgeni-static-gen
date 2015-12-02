var handlebars = require('handlebars');
var grunt = require('grunt');

/**
 * @dgService templateEngine
 * @description A handlebars powered template rendering engine
 */
module.exports = function templateEngine(templateFinder, fileReader, handlebarsTemplateRenderers) {

	return {

		config: {},

		partialsFolder: '',
		filters: [],
		tags: [],
		handlebars: handlebars,

		getRenderer: function() {
			var self = this;

			//load helpers
			var handlebarsHelpers = require('../handlebars-helpers');
			handlebarsHelpers.forEach(function(func){
				func(handlebars);
			});

			return function render(template, data) {
				return handlebarsTemplateRenderers[template](data);
			};
		}
	};
};