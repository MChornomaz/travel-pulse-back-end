const fs = require('fs');

const getDataFromFile = (p, cb) => {
	fs.readFile(p, (err, fileContent) => {
		if (err) {
			cb([]);
			console.log(err);
		} else {
			cb(JSON.parse(fileContent));
		}
	});
};

module.exports = getDataFromFile;
