const { getAll, getById, getByName, create, put, remove } = require('../handlers/calendar-handler')
const schema = require('../schemas/calendar-schema')

/**
 * Se agregan los handlers de cada endpoint del calendario.
 * Se le pasa como parametro el servidor.
 *
 * @param {*} fastify
 */
const endpoints = fastify => {
  fastify.get('/calendars', schema.getAll, (request, reply) => getAll(request, reply, fastify.mongo))
  fastify.get('/calendars/:id', schema.getById, (request, reply) => getById(request, reply, fastify.mongo))
  fastify.get('/calendars/name/:name', schema.getByName, (request, reply) => getByName(request, reply, fastify.mongo))
  fastify.post('/calendars', schema.create, (request, reply) => create(request, reply, fastify.mongo))
  fastify.put('/calendars/:id', schema.update, (request, reply) => put(request, reply, fastify.mongo))
  fastify.delete('/calendars/:id', schema.remove, (request, reply) => remove(request, reply, fastify.mongo))
}

module.exports = endpoints
