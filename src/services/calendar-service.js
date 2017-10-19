const _ = require('lodash')
const moment = require('moment')
const model = require('../models/calendar-model')

/**
 * Genera un nuevo calendario random a partir de un año.
 *
 * @private
 * @param {*} year
 */
const _generateDays = year => {
  const numberOfDays = Math.floor((Math.random() * (56 - 16 + 1)) + 12)

  const dates = []
  for (let i = 1; i < numberOfDays; i++) {
    const month = Math.floor((Math.random() * 12) + 1)
    const day = Math.floor((Math.random() * 28) + 1)
    const date = moment({ year, month, day }).unix()
    if (!_.includes(dates, date)) {
      dates.push(date)
    }
  }

  return dates
}

/**
 * Servicio que retorna todos los calendarios existentes.
 * Se le pasa por parametro la instancia a la db.
 *
 * @param {*} db
 */
const getAll = async db => {
  try {
    return await model.getAll(db)
  } catch (err) {
    throw new Error(err)
  }
}

/**
 * Servicio para agregar un nuevo calendario.
 * Se le pasa por parametro la instancia de la db y el calendario a agregar.
 *
 * @param {*} db
 * @param {*} calendar
 */
const create = async (db, calendar) => {
  try {
    const { ops } = await model.create(db, calendar)
    return _.first(ops)
  } catch (err) {
    throw new Error(err)
  }
}

/**
 * Servicio para generar un nuevo calendario random.
 * Se le pasa por parametro el nombre y el tipo de calendario.
 *
 * @param {*} name
 * @param {*} type
 */
const generate = (name, type) => {
  const year = moment().utc().year()
  return { name, type, years: [{ year, days: _generateDays(year) }] }
}

module.exports = { getAll, create, generate }