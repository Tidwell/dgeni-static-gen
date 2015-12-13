/**
 * @dgProcessor metadataProcessor
 * @description
 * evals metadata as JSOn
 */
module.exports = function metadataProcessor(log) {
	return {
		$runAfter: ['splitContentProcessor'],
		$runBefore: ['contentMarkdownProcessor'],
		$process: function(docs) {
			docs.forEach(function(doc){
				doc.metadata = JSON.parse(doc.metadata);
			});
		}
	};
};