const path = require('path');
const fs = require('fs');
const { v4: uuidV4 } = require('uuid');
const { promisify } = require('util');

const p = path.join(
	path.dirname(process.mainModule.filename),
	'data',
	'users.json'
);

module.exports = class User {
	constructor(name, email, password) {
		this.name = name;
		this.email = email;
		this.password = password;
		this.id = `user-${uuidV4()}`;
		this.role = 'user';
	}

	static async fetchAll() {
		try {
			const fileContent = await promisify(fs.readFile)(p);
			const result = JSON.parse(fileContent);
			console.log(result);
			return result;
		} catch (err) {
			console.log(err);
			return [];
		}
	}

	static async addUser(name, email, password) {
		try {
			const fileContent = await promisify(fs.readFile)(p);
			const users = JSON.parse(fileContent);
			const newUser = new User(name, email, password);
			console.log(newUser);
			users.push(newUser);
			await promisify(fs.writeFile)(p, JSON.stringify(users));
			return newUser;
		} catch (error) {
			console.log(error);
			throw new Error('Could not add user');
		}
	}
};
