const fs = require('fs')
const path = require('path')

/**
 * Se recorren los archivos de la carpeta endpoints para agregar dinamicamente
 * los enpoints del sistema y pasando como parametro el mismo server
 *
 * @param {*} fastify
 */
const endpoints = fastify => {
  const directory = path.join(__dirname, 'endpoints')
  fs.readdirSync(directory).forEach(endpoint => {require(path.join(directory, endpoint))(fastify)})    
}

module.exports = endpoints
