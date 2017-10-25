const { status } = require('../handlers/health-check-handler')
const schema = require('../schemas/health-check-schema')

/**
 * Se agregan los handlers de cada endpoint del calendario.
 * Se le pasa como parametro el servidor.
 *
 * @param {*} fastify
 */
const endpoints = fastify => {
  fastify.get('/health-check', schema, (request, reply) => status(request, reply, fastify.mongo))
}

module.exports = endpoints
