const express = require('express');
const { check } = require('express-validator');
const reviewsControllers = require('../controllers/reviews-controllers');
const fileUpload = require('../middleware/file-upload');

const router = express.Router();

router.get('/reviews', reviewsControllers.getAllReviews);

router.post(
	'/reviews/create',
	fileUpload.single('image'),
	[
		check('location').not().isEmpty(),
		check('heading').isLength({ min: 5 }),
		check('description').not().isEmpty(),
		check('region').not().isEmpty(),
		check('country').not().isEmpty(),
	],
	reviewsControllers.createReview
);

router.patch(
	'/reviews/update',
	fileUpload.single('image'),
	[
		check('location').not().isEmpty(),
		check('heading').isLength({ min: 5 }),
		check('description').not().isEmpty(),
		check('region').not().isEmpty(),
		check('country').not().isEmpty(),
	],
	reviewsControllers.updateReview
);

router.delete(
	'/reviews/delete',

	reviewsControllers.deleteReview
);

module.exports = router;
