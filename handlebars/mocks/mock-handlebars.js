var handlebarsMock = {
	//matches how handlebars stores helpers
	helpers: {
	},
	partials: {
	},
	decorators: {
	},
	compile: function(doc){
		return doc;
	},
	//method for registering a helper
	registerHelper: function(name, func) {
		this.helpers[name] = func;
	},
	registerPartial: function(name,func) {
		this.partials[name] = func;
	},
	//method for registering a helper
	registerDecorator: function(name, func) {
		this.decorators[name] = func;
	}
};

module.exports = handlebarsMock;