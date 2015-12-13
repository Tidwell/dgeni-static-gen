var marked = require('marked');

/**
 * @dgProcessor contentMarkdownProcessor
 * @description
 * process doc content for markdown
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