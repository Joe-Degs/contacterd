

const repository = (db) => {
  const collection = db.collection('contacts');

  const getAllContacts = () => {
    return new Promise ((resolve, reject) => {

    })
  }

  const getContact = (id) => {
    return new Promise ((resolve, reject) => {

    })
  }

  const addContact = (id) => {
    return new Promise ((resolve, reject) => {

    })
  }

  const updateContact = (id) => {
    return new Promise ((resolve, reject) => {

    })
  }

  const deleteContact = (id) => {
    return new Promise ((resolve, reject) => {

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
