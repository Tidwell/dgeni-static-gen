![Build status](https://travis-ci.org/Tidwell/dgeni-static-gen.svg?branch=master)

[Dgeni](https://github.com/angular/dgeni) package providing a static site generator.

Take a folder of files - attach metadata, parse the content as markdown, convert to html, and template through handlebars before writing out.

Add additional dgeni packages to the pipeline for things like data aggregation, custom formatters, pretty urls, etc.  Great start for building any type of static site - promotional, blog, content site, etc.


Expects:

* A folder of markdown documents (configured on readFilesProcessor)
* A folder of handlebars templates (configured on templateFinder)

Outputs:

* A build folder of the documents after having run through the additional/modified dgeni pipeline steps.

New Pipeline:

* readFilesProcessor (base)
* computeIdsProcessor (base)
* computePathsProcessor (base)
* splitContentProcessor (static-content-site)
* webpathProcessor (static-content-site)
* metadataProcessor (static-content-site)
* contentMarkdownProcessor (static-content-site)
* handlebarsPartialsProcessor (handlebars)
* handlebarsTemplatesProcessor (handlebars)
* renderDocsProcessor (base)
* unescapeCommentsProcessor (base)
* writeFilesProcessor (base)
* checkAnchorLinksProcessor (base)


Example

Setup

Create the folder, setup package.json and install dependancies

```bash
mkdir mySite
cd mySite
npm init
npm install canonical-path dgeni https://github.com/Tidwell/dgeni-static-gen.git --save
```

Create the index.js entrypoint and configure the pipeline to run


```javascript

var path = require('canonical-path');

var Dgeni = require('dgeni');
var staticGeneratorPackage = require('static-generator');

/* Create the package for the site generator */
var sitePackage = new Dgeni.Package('sitePackage', [
    staticGeneratorPackage
]);

/* Config */
sitePackage.config(function(writeFilesProcessor){
    writeFilesProcessor.outputFolder = path.resolve(process.cwd(), './build');
});

sitePackage.config(function(readFilesProcessor) {
    readFilesProcessor.basePath = './';
    readFilesProcessor.sourceFiles = [{
        include: 'content/**/*',
        basePath: 'content'
    }];
});

sitePackage.config(function(templateFinder){
    templateFinder.templateFolders.unshift('templates/');
    templateFinder.templatePatterns.unshift('index.hbs');
});

/* Run */
var dgeni = new Dgeni([sitePackage]);

dgeni.generate().then(function(docs) {
    console.log(docs.length, 'docs generated');
});

```


##Develop

``git clone https://github.com/Tidwell/dgeni-static-gen.git``

``cd dgeni-static-gen``

``npm install``


##Run Tests

``npm test``
