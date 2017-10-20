const { getAll, getById, create, put, remove } = require('../handlers/calendar-handler')

/**
 * Se agregan los handlers de cada endpoint del calendario.
 * Se le pasa como parametro el servidor.
 *
 * @param {*} fastify
 */
const endpoints = fastify => {
  fastify.get('/calendars', (request, reply) => getAll(request, reply, fastify.mongo))
  fastify.get('/calendars/:id', (request, reply) => getById(request, reply, fastify.mongo))
  fastify.post('/calendars', (request, reply) => create(request, reply, fastify.mongo))
  fastify.put('/calendars/:id', (request, reply) => put(request, reply, fastify.mongo))
  fastify.delete('/calendars/:id', (request, reply) => remove(request, reply, fastify.mongo))
}

module.exports = endpoints
