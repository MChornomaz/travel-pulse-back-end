const Info = require('../models/info');

exports.getAllInfos = (req, res) => {
	Info.fetchAll((infos) => res.json(infos));
	console.log('info fetched');
};
