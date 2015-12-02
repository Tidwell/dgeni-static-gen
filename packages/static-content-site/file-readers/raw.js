/**
 * @dgService rawDocFileReader
 * @description
 * This file reader will create a simple doc for each document read
 */
module.exports = function rawDocFileReader(log) {
	return {
		name: 'rawDocFileReader',
		defaultPattern: /\.*d$/,
		getDocs: function(fileInfo) {
			try {
				fileInfo.name = fileInfo.filePath;
			} catch (ex) {
				ex.file = fileInfo.filePath;
				throw new Error(
					_.template('JavaScript error in file "${file}"" [line ${lineNumber}, column ${column}]: "${description}"', ex));
			}

			return [{
				docType: 'raw'
			}];
		}
	};
};