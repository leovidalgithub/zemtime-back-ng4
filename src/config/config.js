const path = require('path')

const config = {
  port: 3000,
  db: {
    url: `mongodb://192.168.16.40:27017/ia_zemtime_${process.env.NODE_ENV}`
  },
  email: {
    host: 'smtp.zemsania.com',
    port: 25,
    user: 'gitlab@zemsania.com',
    pass: 'K1Y32Q8bKMbaG6q'
  }
}

const documentation = {
  documentation: {
    swagger: {
      ui: {
        root: path.join(__dirname, '..', 'documentation', 'dist')
      },
      info: {
        title: 'Zemtime Backend Documentation',
        description: 'testing the fastify swagger api',
        version: '2.0.0'
      },
      host: `localhost:${config.port}`,
      schemes: ['http'],
      consumes: ['application/json'],
      produces: ['application/json'],
      excludes: ['/docs']
    }
  }
}

module.exports = { ...config, ...documentation }
