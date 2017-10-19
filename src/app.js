const fastify = require('fastify')()
const mongodb = require('fastify-mongodb')
const helmet = require('fastify-helmet')

const { port, db } = require(`./config/config`)
const error = require('./handlers/error-handler')
const endpoints = require('./endpoints')

// Plugins
fastify.register(helmet)
fastify.register(mongodb, { url: db.url }, err => error(err))
// Endpoints
endpoints(fastify)

// Runner
fastify.listen(port, err => {
  error(err)
  console.log(`Zemtime server listening on ${port}`)
})
