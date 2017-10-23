const error = require('../handlers/error-handler')
/**
 * Se obtiene los calendarios en su totalidad.
 * Se pasa como parámetro la instancia de base de datos.
 *
 * @param {*} db
 */
const getAll = async db => {
  try {
    const collection = db.collection('calendarsholidays')
    return await collection.find({}).toArray()
  } catch (err) {
    throw new Error(err)
  }
}

/**
 * Se crea un nuevo calendario.
 * Se pasa como parámetro la instancia de base de datos y el calendario a agregar.
 *
 * @param {*} db
 * @param {*} calendar
 */
const create = async (db, calendar) => {
  try {
    const collection = db.collection('calendarsholidays')
    return await collection.insertOne(calendar)
  } catch (err) {
    throw new Error(err)
  }
}

/**
 * Se obtiene un calendario.
 * Se pasa como parámetro la instancia de base de datos y el id del calendario.
 *
 * @param {*} db
 * @param {*} id
 */
const getById = async (db, _id) => {
  try {
    const collection = db.collection('calendarsholidays')
    return await collection.findOne({ _id })
  } catch (err) {
    throw new Error(err)
  }
}

/**
 * Se actualiza un calendario.
 * Se pasa como parámetro la instancia de base de datos y el calendario a actualizar.
 *
 * @param {*} db
 * @param {*} calendar
 */
const put = async (db, { _id, ...rest }) => {
  try {
    const collection = db.collection('calendarsholidays')
    return await collection.updateOne({ _id }, { $set: rest })
  } catch (err) {
    throw new Error(err)
  }
}

/**
 * Se actualiza un calendario.
 * Se pasa como parámetro la instancia de base de datos y el calendario a actualizar.
 *
 * @param {*} db
 * @param {*} id
 */
const remove = async (db, _id) => {
  try {
    const collection = db.collection('calendarsholidays')
    return await collection.deleteOne({ _id })
  } catch (err) {
    throw new Error(err)
  }
}

module.exports = { getAll, create, getById, put, remove }
