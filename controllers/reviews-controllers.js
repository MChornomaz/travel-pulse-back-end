const { validationResult } = require('express-validator');
const Review = require('../models/review');
const HttpError = require('../models/http-error');

exports.getAllReviews = (req, res) => {
	Review.fetchAll((reviews) => res.json(reviews));
	console.log('reviews fetched');
};

exports.createReview = async (req, res, next) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return next(
			new HttpError('Invalid inputs passed, please check your data.', 422)
		);
	}

	try {
		const { location, heading, description, region, country } = req.body;
		Review.addReview(
			location,
			req.file.filename,
			heading,
			description,
			region,
			country
		);

		res.status(201).json();
	} catch (error) {
		return next(new HttpError('Creating review failed', 422));
	}
};

exports.updateReview = async (req, res, next) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return next(
			new HttpError('Invalid inputs passed, please check your data.', 422)
		);
	}

	try {
		const { id, location, image, heading, description, region, country, rate } =
			req.body;

		let imageUrl;
		if (typeof image === 'string' || image instanceof String) {
			const imageArr = image.split('/');
			imageUrl = imageArr[imageArr.length - 1];
		} else {
			imageUrl = req.file.filename;
		}

		Review.updateReview(
			id,
			location,
			imageUrl,
			heading,
			description,
			region,
			country,
			rate
		);

		res.status(201).json();
	} catch (error) {
		console.log(error);
		return next(new HttpError('Updating review failed', 422));
	}
};

exports.deleteReview = async (req, res, next) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return next(
			new HttpError('Invalid inputs passed, please check your data.', 422)
		);
	}

	try {
		const { id } = req.body;
		Review.deleteReview(id);

		res.status(201).json();
	} catch (error) {
		console.log(error);
		return next(new HttpError('Updating review failed', 422));
	}
};
