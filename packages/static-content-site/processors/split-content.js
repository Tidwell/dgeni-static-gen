/**
 * @dgProcessor splitContentProcessor
 * @description
 * Splits content on the first --- and sets the top as string metadata
 */
module.exports = function splitContentProcessor(log) {
	return {
		$runAfter: ['computePathsProcessor'],
		$runBefore: ['renderDocsProcessor'],
		$process: function(docs) {
			docs.forEach(function(doc){
				var splitContent = doc.fileInfo.content.split('\n---\n');

				doc.metadata = '';
				doc.fileInfo.content = '';

				if (splitContent.length > 1) {
					doc.metadata = splitContent[0];
					doc.fileInfo.content = splitContent[1];
				} else {
					doc.fileInfo.content = splitContent[0];
				}
			});
		}
	};
};