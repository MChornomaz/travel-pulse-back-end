const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const infoRoutes = require('./routes/info-routes');
const storiesRoutes = require('./routes/stories-routes');
const destinationRoutes = require('./routes/destinations-routes');
const placesRoutes = require('./routes/places-routes');
const reviewsRoutes = require('./routes/reviews-routes');
const usersRoutes = require('./routes/users-routes');

// app.use(bodyParser.text({ type: '/' }));
app.use(bodyParser.json());

app.use((req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', 'no-cors');
	res.setHeader(
		'Access-Control-Allow-Headers',
		'Origin, X-Requested-With, Content-Type, Accept, Authorization'
	);
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');

	next();
});
app.use(
	'/uploads/images',
	express.static(path.join(__dirname, 'uploads', 'images'))
);

app.use(infoRoutes);
app.use(storiesRoutes);
app.use(destinationRoutes);
app.use(placesRoutes);
app.use(reviewsRoutes);
app.use(usersRoutes);

app.listen(process.env.PORT || 4000);
