const fastify = require('fastify')()
const mongodb = require('fastify-mongodb')
const helmet = require('fastify-helmet')
const swagger = require('fastify-swagger')
const statics = require('fastify-static')
const serveStatic = require('serve-static')

const { port, db, documentation } = require(`./config/config`)
const error = require('./handlers/error-handler')
const endpoints = require('./endpoints')

// Plugins
fastify.register(mongodb, { url: db.url }, err => error(err))
fastify.register(helmet)
fastify.register(swagger, documentation)

fastify.use(serveStatic(documentation.swagger.ui))

// Endpoints
endpoints(fastify)

// Runner
fastify.listen(port, err => {
  error(err)
  fastify.swagger()
  console.log(`Zemtime server listening on ${port}`)
})
