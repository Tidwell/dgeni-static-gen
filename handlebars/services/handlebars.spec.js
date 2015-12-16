var templateEngine = require('./handlebars.js')({},{},{});

describe("templateEngine", function() {

  it("should have helpers, filters, and tags", function(done) {
      expect(templateEngine.helpers).toBeArray();
      expect(templateEngine.filters).toBeArray();
      expect(templateEngine.tags).toBeArray();
      done();
  });

  it("should return a render function when getRenderer is called", function() {
    expect(templateEngine.getRenderer()).toBeFunction();
  })
});