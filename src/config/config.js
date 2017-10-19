module.exports = {
  port: 3000,
  db: {
    url: `mongodb://192.168.16.40:27017/ia_zemtime_${process.env.NODE_ENV}`
  },
  enail: {
    host: 'smtp.zemsania.com',
    port: 25,
    user: 'gitlab@zemsania.com',
    pass: 'K1Y32Q8bKMbaG6q'
  }
}
