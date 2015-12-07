/**
 * @dgService markdownFileReader
 * @description
 * This file reader will create a simple doc for each markdown document read
 */
module.exports = function markdownFileReader(log) {
	return {
		name: 'markdownFileReader',
		defaultPattern: /\.*.md$/,
		getDocs: function(fileInfo) {
			try {
				fileInfo.name = fileInfo.filePath;
			} catch (ex) {
				ex.file = fileInfo.filePath;
				throw new Error(
					_.template('JavaScript error in file "${file}"" [line ${lineNumber}, column ${column}]: "${description}"', ex));
			}

			return [{
				docType: 'markdown'
			}];
		}
	};
};