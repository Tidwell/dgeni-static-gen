/**
 * @dgProcessor splitContentProcessor
 * @description
 * Splits content on the first --- and sets the top as string metadata
 */
module.exports = function splitContentProcessor(log) {
	return {
		config: {
			separator: '\n---\n'
		},
		$runAfter: ['computePathsProcessor'],
		$runBefore: ['renderDocsProcessor'],
		$process: function(docs) {
			var self = this;
			docs.forEach(function(doc){
				var splitContent = doc.fileInfo.content.split(self.config.separator);

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