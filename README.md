Example
```javascript

var sg = require('static-generator');
var g = sg.createGenerator({
	buildPath: 'build',
	defaultTemplate: 'templates/default.hbs'
});

g.generatorPackage.config(function(readFilesProcessor) {
	readFilesProcessor.basePath = './';
	readFilesProcessor.sourceFiles = [{
		include: 'content/*',
		basePath: 'content'
	}];
});
g.generatorPackage.config(function(templateFinder){
	templateFinder.templateFolders.unshift('templates/');
	templateFinder.templatePatterns.unshift('default.hbs');
});
g.generatorPackage.config(function(templateEngine){
	templateEngine.partialsFolder = 'templates/partials/';
});
g.generate();

```