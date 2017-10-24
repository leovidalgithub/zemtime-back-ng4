const _ = require('lodash')
const moment = require('moment')
const model = require('../models/calendar-model')

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
 * Servicio que devuelve un calendario.
 * Se le pasa por parametro la instancia de la db y el id del calendario.
 *
 * @param {*} db
 * @param {*} id
 */
const getById = async (db, id) => {
  try {
    return await model.getById(db, id)
  } catch (err) {
    throw new Error(err)
  }
}

/**
 * Servicio que modifica un calendario.
 * Se le pasa por parametro la instancia de la db y el calendario modificado.
 *
 * @param {*} db
 * @param {*} calendar
 */
const put = async (db, calendar) => {
  try {
    return await model.put(db, calendar)
  } catch (err) {
    throw new Error(err)
  }
}

/**
 * Servicio que elimina un calendario.
 * Se le pasa por parametro la instancia de la db y el id del calendario.
 *
 * @param {*} db
 * @param {*} id
 */
const remove = async (db, id) => {
  try {
    return await model.remove(db, id)
  } catch (err) {
    throw new Error(err)
  }
}

/**
 * Servicio que devuelve un calendario.
 * Se le pasa por parametro la instancia de la db y el id del calendario.
 *
 * @param {*} db
 * @param {*} id
 */
const getByName = async (db, name) => {
  try {
    return await model.getByName(db, name)
  } catch (err) {
    throw new Error(err)
  }
}

module.exports = { getAll, create, getById, put, remove, getByName}
