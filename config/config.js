const dbSettings = {
  db: process.env.DB || 'contacterd',
  server: process.env.DB_SERVER || 'mongodb://localhost:27017'
}

const serverSettings = {
  port: process.env.PORT || 3000,
  ssl: null
}

module.exports = Object.assign({}, {dbSettings, serverSettings});