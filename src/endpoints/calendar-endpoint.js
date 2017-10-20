const { getAll, create } = require('../handlers/calendar-handler')

/**
 * Se agregan los handlers de cada endpoint del calendario.
 * Se le pasa como parametro el servidor.
 *
 * @param {*} fastify
 */
const endpoints = fastify => {
  fastify.get('/calendars', (request, reply) => getAll(request, reply, fastify.mongo))
  fastify.post('/calendar/:name/:type', (request, reply) => create(request, reply, fastify.mongo))
}

module.exports = endpoints
