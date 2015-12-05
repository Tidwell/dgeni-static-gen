/**
 * @dgProcessor webpathProcessor
 * @description
 * adds a webpath property to the docs, of its path relative to build root
 * mostly to be overrided later for stuff that interacts with urls. we dont want to mess with
 * the path var as thats used by processors in base
 */
module.exports = function webpathProcessor(writeFilesProcessor) {
	return {
		$runAfter: ['splitContentProcessor'],
		$runBefore: ['metadataProcessor'],
		$process: function(docs) {
			docs.forEach(function(doc){
				//update the document's webPath
				doc.webPath = doc.outputPath.replace(writeFilesProcessor.outputFolder, '');
			});
		}
	};
};