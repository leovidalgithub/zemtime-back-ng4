const { getAll, create } = require('../handlers/calendar-handler')
const schema = require('../schemas/calendar-schema')

/**
 * Se agregan los handlers de cada endpoint del calendario.
 * Se le pasa como parametro el servidor.
 *
 * @param {*} fastify
 */
const endpoints = fastify => {
  fastify.get('/calendars', schema.getAll, (request, reply) => getAll(request, reply, fastify.mongo))
  fastify.post('/calendar/:name/:type', schema.create, (request, reply) => create(request, reply, fastify.mongo))
}

module.exports = endpoints
