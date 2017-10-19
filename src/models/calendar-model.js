const error = require('../handlers/error-handler')
/**
 * Se obtiene los calendarios en su totalidad.
 * Se pasa como parametro la instancia de base de datos.
 *
 * @param {*} db
 */
const getAll = db => {
  return new Promise((resolve, reject) => {
    db.collection('calendarsholidays', (err, collection) => {
      if (err) {
        reject(err)
      } else {
        collection.find({}).toArray((err, calendars) => {
          if (err) {
            reject(err)
          } else {
            resolve(calendars)
          }
        })
      }
    })
  })
}

/**
 * Se crea un nuevo calendario.
 * Se pasa como parametro la instancia de base de datos y el calendario a agregar.
 *
 * @param {*} db
 * @param {*} calendar
 */
const create = (db, calendar) => {
  return new Promise((resolve, reject) => {
    db.collection('calendarsholidays').insert([ calendar ], {}, (err, saved) => {
      if (err) {
        reject(err)
      } else {
        resolve(saved)
      }
    })
  })
}

module.exports = { getAll, create }
