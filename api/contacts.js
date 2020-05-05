'use strict'

module.exports = (router, options) => {
  const { repo } = options;

  router.get('/contacterd', (req, res, next) => {
    repo.getAllContacts().then(contacts => {
      res.status(200).json(contacts)
    }).catch(next)
  })

  router.post('/contacterd', (req, res, next) => {
    repo.addContact(req.body).then(contact => {
      res.status(201).json(contact)
    }).catch(next)
  })

  router.get('/contacterd/get/:id', (req, res, next) => {
    repo.getContact(req.params.id).then(contact => {
      res.status(200).json(contact)
    }).catch(next)
  })

  router.put('/contacterd/update/:id', (req, res, next) => {
    repo.updateContact(req.params.id).then(contact => {
      res.status(200).json(contact)
    }).catch(next)
  })

  router.delete('/contacterd/delete/:id', (req, res, next) => {
    repo.deleteContact(req.params.id).then(contact => {
      res.status(200).json(contact)
    }).catch(next)
  })

}