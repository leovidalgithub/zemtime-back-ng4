const _ = require('lodash')
const moment = require('moment')
const model = require('../models/calendar-model')

/**
 * Servicio que retorna todos los calendarios existentes.
 * Se le pasa por parametro la instancia a la db.
 *
 * @param { db } mongodb
 */
// const getAll = async db => {
const getAll = db => {
  try {
    // return await model.getAll(db)
    return model.getAll(db)
  } catch (err) {
    throw new Error(err)
  }
}

/**
 * Servicio para agregar un nuevo calendario.
 * Se le pasa por parametro la instancia de la db y el calendario a agregar.
 *
 * @param { db } mongodb
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
 * Servicio que devuelve un calendario.
 * Se le pasa por parametro la instancia de la db y el id del calendario.
 *
 * @param {*} mongodb
 * @param {*} id
 */
const getById = (mongodb, id) => {
  try {
    return model.getById(mongodb, id)
  } catch (err) {
    throw new Error(err)
  }
}
// const getById = async (mongodb, id) => {
//   try {
//     return await model.getById(mongodb, id)
//   } catch (err) {
//     throw new Error(err)
//   }
// }

/**
 * Servicio que modifica un calendario.
 * Se le pasa por parametro la instancia de la db y el calendario modificado.
 *
 * @param {*} mongodb
 * @param {*} calendar
 */
const put = (mongodb, data) => {
  try {
    const { calendar, ...set } = data
    return model.put(mongodb, calendar._id, set)
  } catch (err) {
    throw new Error(err)
  }
}

/**
 * Servicio que elimina un calendario.
 * Se le pasa por parametro la instancia de la db y el id del calendario.
 *
 * @param {*} mongodb
 * @param {*} id
 */
const remove = async (mongodb, id) => {
  try {
    return await model.remove(mongodb, id)
  } catch (err) {
    throw new Error(err)
  }
}

/**
 * Servicio que devuelve un calendario.
 * Se le pasa por parametro la instancia de la db y el id del calendario.
 *
 * @param { db } mongodb
 * @param {*} name
 */
const getByName = async (db, name) => {
  try {
    return await model.getByName(db, name)
  } catch (err) {
    throw new Error(err)
  }
}

module.exports = { getAll, create, getById, put, remove, getByName}
