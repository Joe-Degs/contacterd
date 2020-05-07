const MongoClient = require('mongodb').MongoClient;

//i'll pass config.db.dbSettings to this function.
const connect = (options, mediator) => {
  mediator.once('boot.ready', () => {
    const client = new MongoClient(options.server, {
    	useNewUrlParser: true,
    	useUnifiedTopology: true
    });

    client.connect((err) => {
      if(err) {
        mediator.emit('db.error', err);
        return;
      }

      const db = client.db(options.db);
      mediator.emit('db.ready', db, client);
    })
  })
}

module.exports = Object.assign({}, {connect});