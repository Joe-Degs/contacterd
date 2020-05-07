const express = require('express');
const morgan = require('morgan');
const api = require('../api/contacts');

const start = (options) => {
	return new Promise((resolve, reject) => {
		if (!options.repo) {
			return reject(new Error('The server must be started with a connected repository'));
		}

		if (!options.port) {
			return reject(new Error('The server must be started with an available port'));
		}

		const app = express();
		app.use(morgan('dev'));
		app.use(express.json());
		app.use('/api/v1', api(express.Router(), options));
		app.use((err, req, res, next) => {
			reject(new Error('Something went wrong!, err:' + err));
			res.status(500).send('Something went wrong');
		});
		const server = app.listen(options.port, () => resolve(server));
	})
}

module.exports = Object.assign({}, {start});
