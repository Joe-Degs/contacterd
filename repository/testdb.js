const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
const assert = require('assert');

const url = 'mongodb://localhost:27017'
const dbName = 'contacterd';
const id = '5eb196784bf0213813e6d22b';
const pick = (contact) => {
  return {
    firstName: contact.first_name,
    lastName: contact.last_name,
    email: contact.email,
    gender: contact.gender,
    phoneNumber: contact.phone_number,
    url: `http//localhost:${process.env.PORT || 3000}/api/v1/contacterd/get/${contact._id}`
  }
}

const client = new MongoClient(url, { useNewUrlParser: true ,useUnifiedTopology: true });

client.connect(function(err) {
  assert.equal(null, err);
  console.log('connection successful');

  const db = client.db(dbName);
  const collection = db.collection('contacts');
  collection.findOne({_id: new ObjectID(id)}, (err, doc) => {
    const toDelete = doc;
    collection.deleteOne({_id: new ObjectID(id)}, (err, doc) => {
      if(doc.result.n >= 1) {
        console.log([toDelete].map(pick));
        client.close();
      }
    })
  })
})
// const cursor = collection.insertMany([{
//   first_name: 'test',
//   last_name: 'testor',
//   email: 'test@testor@gmail.com',
//   gender: 'non-gender',
//   phone_number: '20102992002',
// }, {
//   first_name: 'testee',
//   last_name: 'testeeror',
//   email: 'testeeteror@testmail.com',
//   gender: 'un-gender',
//   phone_number: '93303039393'
// }], (err, result) => {
//   assert.equal(null, err);
//   let results = result.ops.length > 1 ? result.ops.map(pick) : {...result.ops.map(pick)};
//   console.log(results)
//   client.close();
// })