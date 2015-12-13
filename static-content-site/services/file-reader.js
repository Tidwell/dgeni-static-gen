//Service to just read files, for use in a processor

//based on https://github.com/angular/dgeni-packages/blob/master/base/processors/read-files.js
var path = require('canonical-path');
var Q = require('q');
var qfs = require('q-io/fs');
var _ = require('lodash');
var glob = require('glob');

module.exports = function fileReader() {
  return function(sourceInfo) {
    return getSourceFiles(sourceInfo).then(extractContent);
  };
};

//wants an {include: 'content/**/*'}]
function getSourceFiles(sourceInfo) {
  var filesPromises =[Q.nfcall(glob, sourceInfo.include)];

  return Q.all(filesPromises).then(function(filesCollections) {
    // Once we have all the file path arrays, flatten them into a single array
    return _.flatten(filesCollections);
  });
}

function extractContent(files) {
  var docsPromises = [];

  files.forEach(function(file) {
    // Load up each file and extract content
    var docs = [];
    var docsPromise = qfs.read(file).then(function(content) {
      var splitPath = file.split('/');
      docs.push({content: content, path: file, fileName: splitPath[splitPath.length-1]});
      return docs;
    });

    docsPromises.push(docsPromise);

  });
  return Q.all(docsPromises).then(_.flatten);
}