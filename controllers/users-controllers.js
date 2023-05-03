const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { promisify } = require('util');

const HttpError = require('../models/http-error');
const User = require('../models/user');

const signup = async (req, res, next) => {
	try {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			console.log(errors);
			throw new HttpError(
				'Invalid inputs passed, please check your data.',
				422
			);
		}

		const { name, email, password } = req.body;

		const hashedPassword = await bcrypt.hash(password, 12);

		const createdUser = new User(name, email, hashedPassword);
		console.log(2);
		await User.addUser(name, email, hashedPassword);

		const token = jwt.sign(
			{ userId: createdUser.id, email: createdUser.email },
			'supersecret_dont_share',
			{ expiresIn: '1h' }
		);

		res.status(201).json({
			email: createdUser.email,
			userName: createdUser.name,
			role: createdUser.role,
			token,
		});
	} catch (err) {
		next(err);
	}
};

const login = async (req, res, next) => {
	try {
		const { email, password } = req.body;

		console.log(email, password);

		const users = await User.fetchAll();
		const existingUser = users.find((el) => el.email === email);

		if (!existingUser) {
			throw new HttpError('User was not found.', 401);
		}

		const isValidPassword = await bcrypt.compare(
			password,
			existingUser.password
		);

		if (!isValidPassword) {
			throw new HttpError('Invalid credentials, could not log you in.', 401);
		}

		const token = jwt.sign(
			{ userId: existingUser.id, email: existingUser.email },
			'supersecret_dont_share',
			{ expiresIn: '1h' }
		);

		res.json({
			userName: existingUser.name,
			email: existingUser.email,
			role: existingUser.role,
			token,
		});
	} catch (err) {
		next(err);
	}
};

exports.signup = signup;
exports.login = login;
