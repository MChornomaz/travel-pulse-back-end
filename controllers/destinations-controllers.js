const Destination = require('../models/destination');

exports.getAllDestinations = (req, res) => {
	Destination.fetchAll((destination) => res.json(destination));
	console.log('Destinations fetched');
};
