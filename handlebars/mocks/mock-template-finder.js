module.exports = {
	getFinder: function() {
		return function(doc) {
			return doc.template;
		};
	},
	templateFolders: ['']
};