const service = require('../services/calendar-service')

/**
 * Handler getAll donde se obtienen todos los calendarios.
 * Se envia por parametro el request, el reply y la conexion a mongo
 *
 * @param {*} request
 * @param {*} reply
 * @param {*} mongodb
 */
const getAll = async (request, reply, { db }) => {
  try {
    const calendars = await service.getAll(db)
    reply.send(calendars)
  } catch (err) {
    reply.send(err)
  }
}

/**
 * Handler create donde se crea un calendario nuevo.
 * Se envia por parametro el request, el reply y la conexion a mongo.
 *
 * @param {*} request
 * @param {*} reply
 * @param {*} mongodb
 */
const create = async ({ name, type }, reply, { db }) => {
  try {
    const calendar = service.generate(name, type)
    const saved = await service.create(db, calendar)
    reply.send(saved)
  } catch (err) {
    reply.send(err)
  }
}

module.exports = { getAll, create }
