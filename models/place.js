const path = require('path');
const getDataFromFile = require('../utils/getDataFromFile');

const p = path.join(
	path.dirname(process.mainModule.filename),
	'data',
	'places.json'
);

module.exports = class Place {
	constructor(id, location, imageUrl, place, description, region, country) {
		this.id = id;
		this.location = location;
		this.imageUrl = imageUrl;
		this.place = place;
		this.description = description;
		this.region = region;
		this.country = country;
	}

	static fetchAll(cb) {
		getDataFromFile(p, cb);
	}
};
