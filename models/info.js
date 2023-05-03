const path = require('path');
const getDataFromFile = require('../utils/getDataFromFile');

const p = path.join(
	path.dirname(process.mainModule.filename),
	'data',
	'info.json'
);

module.exports = class Info {
	constructor(
		id,
		heading,
		imageUrl,
		description,
		place,
		location,
		creationDate,
		timeToRead,
		region,
		country
	) {
		this.id = id;
		this.heading = heading;
		this.imageUrl = imageUrl;
		this.description = description;
		this.place = place;
		this.location = location;
		this.creationDate = creationDate;
		this.timeToRead = timeToRead;
		this.region = region;
		this.country = country;
	}

	static fetchAll(cb) {
		getDataFromFile(p, cb);
	}
};
