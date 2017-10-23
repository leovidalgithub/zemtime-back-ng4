const error = require('../handlers/error-handler')
/**
 * Se obtiene los calendarios en su totalidad.
 * Se pasa como parámetro la instancia de base de datos.
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
 * Se pasa como parámetro la instancia de base de datos y el calendario a agregar.
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

/**
 * Se obtiene un calendario.
 * Se pasa como parámetro la instancia de base de datos y el id del calendario.
 *
 * @param {*} db
 * @param {*} id
 */
const getById = (db, id) => {
  return new Promise((resolve, reject) => {
    db.collection('calendarsholidays').findOne({ _id: id }, {}, (err, selected) => {
      if (err) {
        reject(err)
      } else {
        resolve(selected)
      }
    })
  })
}

/**
 * Se actualiza un calendario.
 * Se pasa como parámetro la instancia de base de datos y el calendario a actualizar.
 *
 * @param {*} db
 * @param {*} merged
 */
const put = (db, merged) => {
  return new Promise((resolve, reject) => {
    db.collection('calendarsholidays').update([ merged ], {}, (err, updated) => {
      if (err) {
        reject(err)
      } else {
        resolve(updated)
      }
    })
  })
}

/**
 * Se actualiza un calendario.
 * Se pasa como parámetro la instancia de base de datos y el calendario a actualizar.
 *
 * @param {*} db
 * @param {*} id
 */
const remove = (db, id) => {
  return new Promise((resolve, reject) => {
    db.collection('calendarsholidays').deleteOne([ id ], {}, (err, removed) => {
      if (err) {
        reject(err)
      } else {
        resolve(removed)
      }
    })
  })
}

module.exports = { getAll, create, getById, put, remove }
