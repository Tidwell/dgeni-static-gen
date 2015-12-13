var handlebarsPackage = require('./');
var mockPackage = require('./mocks/mock-package');
var Dgeni = require('dgeni');
var path = require('canonical-path');

describe('handlebars package', function() {

  function runDgeni(docs) {
    var testPackage = new Dgeni.Package('testPackage', [mockPackage()])
      .processor('provideTestDocs', function() {
        return {
          $runBefore: ['computeIdsProcessor'],
          $process: function() {
            return docs;
          }
        };
      })
     
      .config(function(readFilesProcessor, writeFilesProcessor, renderDocsProcessor, unescapeCommentsProcessor, handlebarsTemplatesProcessor) {
        readFilesProcessor.$enabled = false;
        writeFilesProcessor.$enabled = false;
        //renderDocsProcessor.$enabled = false;
        unescapeCommentsProcessor.$enabled = false;
        handlebarsTemplatesProcessor.$enabled = false;
      })

      .config(function(computeIdsProcessor) {
        computeIdsProcessor.idTemplates.push({
          docTypes: ['service', 'guide'],
          getId: function(doc) {
            return doc.docType + ':' + doc.fileInfo.baseName;
          },
          getAliases: function(doc) {
            return [doc.fileInfo.baseName, doc.fileInfo.relativePath];
          }
        });
      })

      .config(function(computePathsProcessor) {
        computePathsProcessor.pathTemplates = [
          // Default path processor template
          {
            docTypes: ['service', 'guide'],
            getPath: function(doc) {
              var docPath = path.dirname(doc.fileInfo.relativePath);
              if ( doc.fileInfo.baseName !== 'index' ) {
                docPath = path.join(docPath, doc.fileInfo.baseName);
              }
              return docPath;
            },
            getOutputPath: function(doc) {
              return doc.path +
                  ( doc.fileInfo.baseName === 'index' ? '/index.html' : '.html');
            }
          }
        ];
      });
    return new Dgeni([testPackage]).generate();
  }

  it("should be instance of Package", function() {
      expect(handlebarsPackage instanceof Dgeni.Package).toBeTruthy();
  });


  describe("templateEngine", function() {

    it("should have helpers, filters, and tags", function(done) {
      handlebarsPackage.config(function(templateEngine){
        expect(templateEngine.helpers).toBeArray();
        expect(templateEngine.filters).toBeArray();
        expect(templateEngine.tags).toBeArray();
      });
      runDgeni([]).then(function() {
        done();
      });
    });
  });

});