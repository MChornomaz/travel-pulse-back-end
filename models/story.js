const path = require('path');
const getDataFromFile = require('../utils/getDataFromFile');

const p = path.join(
	path.dirname(process.mainModule.filename),
	'data',
	'stories.json'
);

module.exports = class Story {
	constructor(
		id,
		location,
		imageUrl,
		creationDate,
		timeToRead,
		heading,
		description,
		region,
		country
	) {
		this.id = id;
		this.location = location;
		this.imageUrl = imageUrl;
		this.creationDate = creationDate;
		this.timeToRead = timeToRead;
		this.heading = heading;
		this.description = description;
		this.region = region;
		this.country = country;
	}

	static fetchAll(cb) {
		getDataFromFile(p, cb);
	}
};
