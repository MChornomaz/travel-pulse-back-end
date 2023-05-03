const Story = require('../models/story');

exports.getAllStories = (req, res) => {
	Story.fetchAll((infos) => res.json(infos));
	console.log('Stories fetched');
};
