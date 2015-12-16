var Q = require('q');

function createFileReaderMock(mockData) {
	mockData = mockData || [];
	
	var fileReaderMock = function(data) {
		var deferred = Q.defer();
		setTimeout(function() {
			deferred.resolve(mockData);
		},0);
		return deferred.promise;
	};
	return fileReaderMock;
}


module.exports = createFileReaderMock;