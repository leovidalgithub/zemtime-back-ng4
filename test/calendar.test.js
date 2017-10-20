const assert = require('assert')
const mongodb = require('mongodb')
const mongoInMemory = require('mongo-in-memory')

const { port, database, mocks } = require('./config/config')
const service = require('../src/services/calendar-service')

describe('Calendar Module', () => {
  const mongoServerInstance = new mongoInMemory(port)
  const uri = mongoServerInstance.getMongouri(database)

  before(done => {
    mongoServerInstance.start(error => {
      mongoServerInstance.addDirectoryOfCollections(database, mocks, (error, documents) => {
        assert.equal(error, null)
        assert.equal(documents.length, 5)
      })

      assert.equal(error, null)
      done()
    })
  })

  after(done => {
    mongoServerInstance.stop(error => {
      assert.equal(error, null)
      done()
    })
  })

  describe('Get all the calendars', () => {
    it('should return all the calendars', done => {
      mongodb.connect(uri, async (error, db) => {
        if (!error) {
          try {
            const [ { _id, name, type, years } ] = await service.getAll(db)

            assert.notEqual(_id, 0)
            assert.equal(name, 'Barcelona')
            assert.equal(type, 3)
            assert.equal(years.length, 1)
            assert.equal(years[0].days.length, 39)

            done()
          } catch (err) {
            console.error(err)
            done(err)
          }
        } else {
          console.error(error)
          done(error)
        }

        db.close()
      })
    })

    it('should return an error when get all calendars', done => {
      mongodb.connect(uri, async (error, db) => {
        if (!error) {
          try {
            await service.getAll()
          } catch ({ message }) {
            assert.notEqual(message, null)
            done()
          }
        } else {
          console.error(error)
          done(error)
        }

        db.close()
      })
    })
  })

  describe('Create a new calendar', () => {
    it('should return a new Buenos Aires calendar', done => {
      mongodb.connect(uri, async (error, db) => {
        if (!error) {
          try {
            const calendar = await service.generate('Buenos Aires', 1)

            assert.equal(calendar.name, 'Buenos Aires')
            assert.equal(calendar.type, 1)
            assert.equal(calendar.years[0].year, 2017)
            assert.notEqual(calendar.years[0].days.length, 0)

            const { _id, name, type, years } = await service.create(db, calendar)

            assert.equal(name, 'Buenos Aires')
            assert.equal(type, 1)
            assert.notEqual(_id, 0)
            assert.notEqual(years.length, 0)

            done()
          } catch (err) {
            console.error(err)
            done(err)
          }
        } else {
          console.error(error)
          done(error)
        }

        db.close()
      })
    })

    it('should return an error for null calendar creation', done => {
      mongodb.connect(uri, async (error, db) => {
        if (!error) {
          try {
            await service.create(db, null)
          } catch ({ message }) {
            assert.notEqual(message, null)
            done()
          }
        } else {
          console.error(error)
          done(error)
        }

        db.close()
      })
    })
  })
})
