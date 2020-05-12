/* eslint-env mocha */
const request = require('supertest');
const test = require('assert');
const server = require('../server/server');

describe('[ MOVIES API ]', () => {
  let importantObject = null;
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
      url: `/api/v1/contacterd/get/${contact.id}`
    }
  }

  let testRepo = {
    getAllContacts ()  {
      const res = {
        count: testContacts.length,
        contacts: testContacts.map(pick)
      }
      return Promise.resolve(res);
    },
    getContact (Id) {
      const contact = testContacts.find(({ id }) => Id === id);
      return Promise.resolve(...[contact].map(pick));
    },
    addContact (body) {
      body.id = 'jfdkfjirierdjfkdjfkei';
      const res = testContacts.push(body);
      return Promise.resolve(...[body].map(pick));
    },
    updateContact (Id, body) {
      const arrItemIdx = testContacts.findIndex(({ id }) => id === Id);
      Object.keys(body).forEach(prop => testContacts[arrItemIdx][prop] = body[prop]);
      return Promise.resolve(...[testContacts[arrItemIdx]].map(pick));
    },
    deleteContact (Id) {
      const arrItemIdx = testContacts.findIndex(({ id }) => id === Id);
      const removed = testContacts.splice(arrItemIdx, 1);
      return Promise.resolve(...removed.map(pick));
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
        const exp = {
          count: testContacts.length,
          contacts: testContacts.map(pick)
        }
        importantObject = res.body.contacts;
        test.strict.deepEqual(res.body.contacts, exp.contacts);
      })
      .expect(200, done)
  });

  it('should add one contact and return it', (done) => {
    const exp = {
      id: 'jfdkfjirierdjfkdjfkei',
      first_name: 'Joe',
      last_name: 'Screen',
      email: 'tmlail@umail.com',
      gender: 'Male',
      phone_number: '343434334'
    };

    request(app)
      .post('/api/v1/contacterd/post')
      .send(exp)
      .expect(res => {
        test.strict.deepEqual(res.body, ...[exp].map(pick));
        test.strict.equal(testContacts.length, importantObject.length + 1);
      })
      .expect(201, done)
  });

  it('should return an item with the specified id', (done) => {
    request(app)
      .get('/api/v1/contacterd/get/oiroeirodkdkfdfijier')
      .expect(res => {
        test.strict.deepEqual({
          first_name: 'Benard',
          last_name: 'Kofi_son',
          email: 'jfeifjeifj@tmail.com',
          gender: 'Male',
          phone_number: '9393394884',
          'url': '/api/v1/contacterd/get/oiroeirodkdkfdfijier'
        }, res.body)
      })
      .expect(200, done)
  });

  it('should update contact with specified id', (done) => {
    const obj = {
      first_name: 'Joshua',
      last_name: 'Clottey'
    };

    request(app)
      .put('/api/v1/contacterd/update/jdfjdjfdkjkdjdikd')
      .send(obj)
      .expect(res => {
        const exp = testContacts[0];
        Object.keys(obj).forEach(key => exp[key] = obj[key]);
        test.strict.deepEqual(res.body, ...[exp].map(pick));
      })
      .expect(200, done);
  });

  it('should delete an item from the database and return it', (done) => {
    const exp = JSON.stringify(testContacts[1]);
    request(app)
      .delete('/api/v1/contacterd/delete/oiroeirodkdkfdfijier')
      .expect(res => {
        test.strict.deepEqual(res.body, ...[JSON.parse(exp)].map(pick));
        test.strict.equal(testContacts.length, importantObject.length);
        test.strict.notEqual(importantObject.length - 1, testContacts.length);        
      })
      .expect(200, done)
  });

});