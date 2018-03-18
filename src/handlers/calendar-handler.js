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
 * Handler getById donde se obtiene un calendario.
 * Se envia por parametro el request, el reply y la conexion a mongo
 *
 * @param { params } request
 * @param {*} reply
 * @param {*} mongodb
 */
const getById = async ({ params }, reply, mongodb) => {
  try {
    const calendar = await service.getById(mongodb, params.id)
    reply.send(calendar)
  } catch (err) {
    reply.send(err)
  }
}

/**
 * Handler create donde se crea un calendario nuevo.
 * Se envia por parametro el request, el reply y la conexion a mongo.
 *
 * @param { body } request
 * @param {*} reply
 * @param { db } mongodb
 */
const create = async ({ body }, reply, { db }) => {
  try {
    const { name, type, year } = body
    const calendar = { name, type, years: [{ year, days: [] }] }
    const saved = await service.create(db, calendar)
    reply.send(saved)
  } catch (err) {
    reply.send(err)
  }
}

/**
 * Handler update donde se modifica un calendario.
 * Se envia por parametro el request, el reply y la conexion a mongo.
 *
 * @param { params, body } request
 * @param {*} reply
 * @param {*} mongodb
 */
const put = async ({ params, body }, reply, mongodb) => {
  try {
    const calendar = await service.getById(mongodb, body._id)
    const pepe = await service.put(mongodb, { calendar, ...body })
    reply.send(pepe)
  } catch (err) {
    reply.send(err)
  }
}

/**
 * Handler remove donde se elimina un calendario.
 * Se envia por parametro el request, el reply y la conexion a mongo.
 *
 * @param { params } request
 * @param {*} reply
 * @param {*} mongodb
 */
const remove = async ({ params }, reply, mongodb) => {
  try {
    const removed = await service.remove(mongodb, params.id)
    reply.send(removed)
  } catch (err) {
    reply.send(err)
  }
}

/**
 * Handler getByName donde se obtiene un calendario.
 * Se envia por parametro el request, el reply y la conexion a mongo
 *
 * @param { params } request
 * @param {*} reply
 * @param { db } mongodb
 */

const getByName = async ({ params }, reply, { db }) => {
  try {
    const calendar = await service.getByName(db, params.name)
    reply.send(calendar)
  } catch (err) {
    reply.send(err)
  }
}

module.exports = { getAll, getById, create, put, remove, getByName }
