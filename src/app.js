const fastify = require('fastify')()
const mongodb = require('fastify-mongodb')
const helmet = require('fastify-helmet')
const swagger = require('fastify-swagger')

const { port, db, documentation } = require(`./config/config`)
const error = require('./handlers/error-handler')
const endpoints = require('./endpoints')

// Plugins
fastify.register(helmet)
fastify.register(mongodb, { url: db.url }, err => error(err))
fastify.register(swagger, documentation)
// Endpoints
endpoints(fastify)

// Runner
fastify.listen(port, err => {
  error(err)
  fastify.swagger()
  console.log(`Zemtime server listening on ${port}`)
})
