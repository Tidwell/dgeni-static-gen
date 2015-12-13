//https://github.com/angular/dgeni-packages/blob/master/base/mocks/mockPackage.js
var Package = require('dgeni').Package;

module.exports = function mockPackage() {

  return new Package('mockPackage', [require('../'), require('../../node_modules/dgeni-packages/base')])

  // provide a mock log service
  .factory('log', function() { return require('dgeni/lib/mocks/log')(false); })

    // provide a mock fileReader engine for the tests
  .factory('fileReader', function dummyFileReader() {
    var spy = jasmine.createSpy('fileReader');
    return function() {
      return spy;
    }
  })
  
};