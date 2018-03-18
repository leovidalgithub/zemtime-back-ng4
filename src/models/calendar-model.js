const error = require('../handlers/error-handler')
/**
 * Se obtiene los calendarios en su totalidad.
 * Se pasa como parámetro la instancia de base de datos.
 *
 * @param { db } mongodb
 */
// const getAll = async db => {
const getAll = db => {
  try {
    const collection = db.collection('calendarsholidays')
    // return await collection.find().toArray()
    return collection.find().toArray()
  } catch (err) {
    throw new Error(err)
  }
}

/**
 * Se crea un nuevo calendario.
 * Se pasa como parámetro la instancia de base de datos y el calendario a agregar.
 *
 * @param { db } mongodb
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
const getById = (mongodb, id) => {
  try {
    const { db, ObjectId } = mongodb
    const collection = db.collection('calendarsholidays')
    return collection.findOne({ _id: ObjectId(id) })
  } catch (err) {
    throw new Error(err)
  }
}
// const getById = async (mongodb, id) => {
//   try {
//     const { db, ObjectId } = mongodb
//     const collection = db.collection('calendarsholidays')
//     return await collection.findOne({ _id: ObjectId(id) })
//   } catch (err) {
//     throw new Error(err)
//   }
// }

/**
 * Se actualiza un calendario.
 * Se pasa como parámetro la instancia de base de datos, el id del calendario y los atributos a actualizar.
 *
 * @param {*} mongodb
 * @param {*} id
 * @param {*} set
 */
const put = (mongodb, id, set) => {
  try {
    const { db, ObjectId } = mongodb
    const collection = db.collection('calendarsholidays')
    // return collection.updateOne({ _id: ObjectId(id) }, { $set: set })
    delete set._id;
    return collection.findOneAndUpdate({ _id: ObjectId(id)}, {$set: set}, {upsert:true, returnNewDocument: true})
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
 * @param { db } mongodb
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
