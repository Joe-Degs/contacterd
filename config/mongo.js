const MongoClient = require('mongodb').MongoClient;

//i'll pass config.db.dbSettings to this function.
const connect = (options, mediator) => {
  const client = new MongoClient(options.server, {
  	useNewUrlParser: true,
  	useUnifiedTopology: true
  });

  client.connect((err) => {
    if(err) {
      return mediator.emit('db.error', err);
    }

    const db = client.db(options.db);
    mediator.emit('db.ready', db);
  })
}

module.exports = Object.assign({}, {connect});