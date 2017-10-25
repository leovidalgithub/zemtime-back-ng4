/**
 * Se verifica el estado de los componentes que utiliza el backend
 *
 * @param {*} request
 * @param {*} reply
 * @param {*} mongodb
 */
const status = (request, reply, { db }) => {
  const mongodb = db ? 'ok' : 'fail'
  reply.send({ mongodb })
}

module.exports = { status }
