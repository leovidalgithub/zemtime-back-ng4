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
    return await collection.find().toArray()
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
 * @param {*} mongodb
 * @param {*} id
 */
const getById = async (mongodb, id) => {
  try {
    const { db, ObjectId } = mongodb
    const collection = db.collection('calendarsholidays')
    return await collection.findOne({ _id: ObjectId(id) })
  } catch (err) {
    throw new Error(err)
  }
}

/**
 * Se actualiza un calendario.
 * Se pasa como parámetro la instancia de base de datos, el id del calendario y los atributos a actualizar.
 *
 * @param {*} mongodb
 * @param {*} id
 * @param {*} set
 */
const put = async (mongodb, id, set) => {
  try {
    const { db, ObjectId } = mongodb
    const collection = db.collection('calendarsholidays')
    return await collection.updateOne({ _id: ObjectId(id) }, { $set: set })
  } catch (err) {
    throw new Error(err)
  }
}

/**
 * Se actualiza un calendario.
 * Se pasa como parámetro la instancia de base de datos y el calendario a actualizar.
 *
 * @param {*} mongodb
 * @param {*} id
 */
const remove = async (mongodb, id) => {
  try {
    const { db, ObjectId } = mongodb
    const collection = db.collection('calendarsholidays')
    return await collection.deleteOne({ _id: ObjectId(id) })
  } catch (err) {
    throw new Error(err)
  }
}

/**
 * Se obtiene un calendario.
 * Se pasa como parámetro la instancia de base de datos y el nombre del calendario.
 *
 * @param {*} db
 * @param {*} name
 */
const getByName = async (db, name) => {
  try {
    const collection = db.collection('calendarsholidays')
    return await collection.findOne({ name })
  } catch (err) {
    throw new Error(err)
  }
}

module.exports = { getAll, create, getById, put, remove, getByName}
