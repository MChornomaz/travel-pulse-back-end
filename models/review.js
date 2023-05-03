const path = require('path');
const fs = require('fs');
const { v4: uuidV4 } = require('uuid');
const getDataFromFile = require('../utils/getDataFromFile');

const p = path.join(
	path.dirname(process.mainModule.filename),
	'data',
	'reviews.json'
);

module.exports = class Review {
	constructor(
		id,
		location,
		imageUrl,
		heading,
		description,
		rate,
		scores,
		region,
		country
	) {
		this.id = id;
		this.location = location;
		this.imageUrl = imageUrl;
		this.rate = rate;
		this.timeToRead = scores;
		this.heading = heading;
		this.description = description;
		this.region = region;
		this.country = country;
	}

	static fetchAll(cb) {
		getDataFromFile(p, cb);
	}

	static addReview(location, image, heading, description, region, country) {
		fs.readFile(p, (err, fileContent) => {
			let reviews = [];
			if (!err) {
				reviews = JSON.parse(fileContent);
			}
			const id = `review-${uuidV4()}`;
			const imageUrl = `/uploads/images/reviews/${image}`;
			const rate = 0;
			const timeToRead = Math.floor(Math.random() * 10) + 1;

			const newReview = {
				id,
				location,
				imageUrl,
				rate,
				timeToRead,
				heading,
				description,
				region,
				country,
			};
			reviews.push(newReview);

			fs.writeFile(p, JSON.stringify(reviews), (error) => {
				if (error) {
					console.log(error);
				}
			});
		});
	}

	static updateReview(
		id,
		location,
		image,
		heading,
		description,
		region,
		country,
		rate
	) {
		fs.readFile(p, (err, fileContent) => {
			let reviews = [];
			if (!err) {
				reviews = JSON.parse(fileContent);

				const index = reviews.findIndex((el) => el.id === id);

				const imageUrl = `/uploads/images/reviews/${image}`;

				const newReview = {
					id,
					location,
					imageUrl,
					rate,
					heading,
					description,
					region,
					country,
				};
				reviews[index] = newReview;

				fs.writeFile(p, JSON.stringify(reviews), (error) => {
					if (error) {
						console.log(error);
					}
				});
			}
		});
	}

	static deleteReview(id) {
		fs.readFile(p, (err, fileContent) => {
			let reviews = [];
			if (!err) {
				reviews = JSON.parse(fileContent);

				const newArr = reviews.filter((el) => el.id !== id);
				// console.log(id);
				// console.log(newArr);

				fs.writeFile(p, JSON.stringify(newArr), (error) => {
					if (error) {
						console.log(error);
					}
				});
			}
		});
	}
};
