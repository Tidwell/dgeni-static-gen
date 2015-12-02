var marked = require('marked');

/**
 * @dgProcessor contentMarkdownProcessor
 * @description
 * Remove docs that do not contain the ngdoc tag
 */
module.exports = function contentMarkdownProcessor(log) {
	return {
		$runAfter: ['splitContentProcessor'],
		$runBefore: ['renderDocsProcessor'],
		$process: function(docs) {
			docs.forEach(function(doc){
				doc.fileInfo.content = marked(doc.fileInfo.content);
			});
		}
	};
};