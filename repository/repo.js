const ObjectID = require('mongodb').ObjectID;

const repository = (db) => {

  const collection = db.collection('contacts');

  const pick = (contact) => {
    return {
      first_name: contact.first_name,
      last_name: contact.last_name,
      email: contact.email,
      gender: contact.gender,
      phone_number: contact.phone_number,
      url: `http//localhost:${process.env.PORT || 3000}/api/v1/contacterd/get/${contact._id}`
    }
  }

  const getAllContacts = () => {
    return new Promise ((resolve, reject) => {
      const cursor = collection.find({});


      const callback = (err, docs) => {
        if (err) {
          return reject(new Error('an error occurred while pulling contacts', err));
        }

        const contacts = {
          count: docs.length,
          contacts: docs.map(pick)
        };

        return resolve(contacts);
      }

      return cursor.toArray(callback);
    })
  }

  const getContact = (id) => {
    return new Promise ((resolve, reject) => {
      const cursor = collection.find({_id: new ObjectID(id)});

      const callback = (err, doc) => {
        if (err) {
          return reject(new Error('an error occurred while pulling contacts', err));
        }

        return resolve(
          ...doc.map(pick)
        );
      }
      return cursor.toArray(callback);
    })
  }

  const addContact = (body) => {
    return new Promise ((resolve, reject) => {
      let callback = (err, doc) => {
        if (err) {
          return reject(new Errorr('an error occurred while pulling contacts', err));
        }

        return doc.ops.length > 1 ? resolve(doc.ops.map(pick))
          : resolve(...doc.ops.map(pick))
      }

      if(Array.isArray(body)) {
        return collection.insertMany(body, callback);
      }

      return collection.insertOne(body, callback);
    })
  }

  const updateContact = (id, body) => {
    return new Promise ((resolve, reject) => {
      
      const callback = (err, doc) => {
        if (err) {
          return reject(new Error('an error occurred while updating', err));
        }

        return doc.result.n >= 1 ? getContact(id) :
          reject(new Error('invalid id'));
      }

      collection.updateOne(
        {_id: new ObjectID(id)},
        {$set: body},
        callback 
      )
    })
  }

  const deleteContact = (id) => {
    return new Promise ((resolve, reject) => {
      let deleted;
      const callback = (err, doc) => {
        if (err) {
          return reject(new Error('an error occurred while deleting', err));
        }

        return doc.result.n >= 1 ? resolve(...[deleted].map(pick)) :
          reject(new Error('invalid id'));
      }

      collection.findOne({_id: new ObjectID(id)}, (err, doc) => {
        if (err) {
          return reject(new Error('an error occurred while deleting', err));
        }
        deleted = doc;
        collection.deleteOne({_id: new ObjectID(id)}, callback);
      })
    })
  }

  return Object.create({
    getAllContacts,
    getContact,
    addContact,
    updateContact,
    deleteContact
  })
};

const connect = (connection) => {
  return new Promise((resolve, reject) => {
    if(!connection) {
      reject(new Error('supply a connection db'))
    }
    resolve(repository(connection))
  })
}

module.exports = Object.assign({}, {connect})
