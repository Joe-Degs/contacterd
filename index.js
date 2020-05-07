'use strict';

const { EventEmitter } = require('events');
const server = require('./server/server');
const repository = require('./repository/repo');
const config = require('./config/');
const logs = require('./logs/');
const mediator = new EventEmitter();

process.on('uncaughtException', (err, origin) => {
	logs('error', err);
	logs('debug', 'uncaughtException at: '+ origin);
});

process.on('unhandledRejection', (reason, promise) => {
	logs('error', reason);
	logs('debug', 'Unhandled rejection at: ' + promise);
});

process.on('uncaughtRejection', (err, promise) => {
  logs('error', err);
  logs('debug', 'uncaughtRejection at: ' + promise);
});

mediator.on('db.ready', (db, client) => {
	repository.connect(db)
		.then(repo => {
			console.log('Connected, Starting server');
			return server.start({
				port: config.serverSettings.port,
				ssl: config.serverSettings.ssl,
				repo
			})
			.then(app => {
				console.log('Server started successfully');
				app.on('close', () => {
					client.close();
				})
			})
		})
});

mediator.on('db.error', (err) => {
	logs('error', err);
});

config.db.connect(config.dbSettings, mediator);

mediator.emit('boot.ready');

