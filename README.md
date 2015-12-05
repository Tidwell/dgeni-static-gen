
[Dgeni](https://github.com/angular/dgeni) package providing a static site generator.

Take a folder of markdown documents, conver thme to html, then template through a handlebars template engine before writing out.

Add additional dgeni packages to the pipeline for things like metadata, data aggregation, custom formatters, etc.  Great start for building any type of static site - be it promotional, blog, content site, etc.


Expects:

* A folder of markdown documents (configured on readFilesProcessor)
* A folder of handlebars templates (configured on templateFinder)

Outputs:

* A build folder of the documents after having run through the additional/modified dgeni pipeline steps.



Example

```javascript

var path = require('canonical-path');

var Dgeni = require('dgeni');
var staticGuideDgeniPackage = require('static-generator');

/* Create the package for the site generator */
var testSitePackage = new Dgeni.Package('testSitePackage', [
	staticGuideDgeniPackage
]);

/* Config */
testSitePackage.config(function(writeFilesProcessor){
	writeFilesProcessor.outputFolder = path.resolve(process.cwd(), './build');
});

testSitePackage.config(function(readFilesProcessor) {
	readFilesProcessor.basePath = './';
	readFilesProcessor.sourceFiles = [{
		include: 'content/**/*',
		basePath: 'content'
	}];
});

testSitePackage.config(function(templateFinder){
	templateFinder.templateFolders.unshift('templates/');
	templateFinder.templatePatterns.unshift('index.hbs');
});

/* Run */
var dgeni = new Dgeni([testSitePackage]);

dgeni.generate().then(function(docs) {
	console.log(docs.length, 'docs generated');
});

```