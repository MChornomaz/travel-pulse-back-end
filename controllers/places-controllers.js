const Place = require('../models/place');

exports.getAllPlaces = (req, res) => {
	Place.fetchAll((places) => res.json(places));
	console.log('places fetched');
};
