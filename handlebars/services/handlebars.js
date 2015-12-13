var handlebars = require('handlebars');

/**
 * @dgService templateEngine
 * @description A handlebars powered template rendering engine
 */
module.exports = function templateEngine(templateFinder, fileReader, handlebarsTemplateRenderers) {

	return {

		config: {},

		partialsFolder: '',
		helpers: [],
		filters: [],
		tags: [],
		handlebars: handlebars,

		getRenderer: function() {
			var self = this;

			//load helpers
			var builtInHelpers = require('../helpers');
			var allHelpers = this.helpers.concat(builtInHelpers).concat(this.filters);
			allHelpers.forEach(function(func){
				func(handlebars);
			});


			return function render(template, data) {
				return handlebarsTemplateRenderers[template](data);
			};
		}
	};
};