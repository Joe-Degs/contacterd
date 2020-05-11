/* eslint-env mocha */
const request = require('supertest');
const server = require('../server/server');

describe('[ MOVIES API ]', () => {
  let app = null;
  let testContacts = [{
    id: 'jdfjdjfdkjkdjdikd',
    first_name: 'Joe',
    last_name: 'Degs',
    email: 'jpeifdfdi@gmail.com',
    gender: 'Male',
    phone_number: '99298383839'
  }, {
    id: 'oiroeirodkdkfdfijier',
    first_name: 'Benard',
    last_name: 'Kofi_son',
    email: 'jfeifjeifj@tmail.com',
    gender: 'Male',
    phone_number: '9393394884'
  }, {
    id: 'hdfdhfuihuerhuhdfjdhf',
    first_name: 'Lupez',
    last_name: 'Marcieli',
    email: 'ureirj@gmail.com',
    gender: 'Female',
    phone_number: '92039384'
  }];

  const pick = (contact) => {
    return {
      first_name: contact.first_name,
      last_name: contact.last_name,
      email: contact.email,
      gender: contact.gender,
      phone_number: contact.phone_number,
      uri: `/api/v1/contacterd/get/${contact._id}`
    }
  }

  let testRepo = {
    getAllContacts ()  {
      const res = {
        count: testContacts.length,
        contacts: contacts.map(pick)
      }
      return Promise.resolve(res);
    },
    getContact (ID) {
      const contact = testContacts.find(({ id }) => ID === id);
      return Promise.resolve(...[contact].map(pick));
    },
    addContact (body) {
      body.id = 'jfdkfjirierdjfkdjfkei';
      const res = testContacts.push(body);
      return Promise.resolve(...[body].map(pick))
    },
    updateContact (Id, body) {
      const arrItemIdx = testContacts.findIndex(({ id }) => id === Id);
      Object.keys(body).forEach(prop => testContacts[arrItemIdx][prop] = body[prop]);
      return Promise.resolve(...[testContacts[arrItemIdx]].map(pick));
    },
    deleteContact (Id) {
      const arrItemIdx = testContacts.findIndex(({ id }) => id === Id);
      const removed = testContacts.splice(arrItemIdx, 1);
      return Promise.resolve(...[removed].map(pick));
    }
  }

  beforeEach(() => {
    return server.start({
      port: 3000,
      repo: testRepo
    }).then(serv => {
      app = serv
    })
  });

  afterEach(() => {
    app.close();
    app = null;
  });

  it('returns all contacts', (done) => {
    request(app)
      .get('/api/v1/contacterd/get')
      .expect(res => {
        res.body.contacts.should.containEql({
          'first_name': 'Lupez',
          'last_name': 'Marcieli',
          'email': 'ureirj@gmail.com',
          'gender': 'Female',
          'phone_number': '92039384'
          'url': '/api/v1/contacterd/get/hdfdhfuihuerhuhdfjdhf'
        })
        .expect(200, done)
      })
  });

  it('should return one contact', (done) => {
    request(app)
      .post('/api/v1/contacterd/post')
      .send({
        first_name: 'Joe',
        last_name: 'Screen',
        email: 'tmlail@umail.com',
        gender: 'Male',
        phone_number: '343434334'
      })
      .expect(res => {
        res.body
      })
  });
});