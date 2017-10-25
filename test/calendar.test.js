const assert = require('assert')
const mongodb = require('mongodb')
const mongoInMemory = require('mongo-in-memory')

const { port, database, mocks } = require('./config/config')
const service = require('../src/services/calendar-service')

describe('Calendar Module', () => {
  const ObjectId = mongodb.ObjectId
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

    it('should return an error when get all the calendars', done => {
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
            const calendar = { name: 'Buenos Aires', type: 1, years: [{ year: 2017, days: [] }] }

            const { _id, name, type, years } = await service.create(db, calendar)
            const calendars = await service.getAll(db)

            assert.equal(name, 'Buenos Aires')
            assert.equal(type, 1)
            assert.notEqual(_id, 0)
            assert.notEqual(years.length, 0)
            assert.equal(years[0].days.length, 0)
            assert.equal(calendars.length, 6)

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
            await service.create()
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

  describe('Get the calendar data by ID', () => {
    it('should return the calendar data', done => {
      mongodb.connect(uri, async (error, db) => {
        if (!error) {
          try {
            const document = { name: 'Capital Federal', type: 1, years: [{ year: 2015, days: [] }] }

            const inserted = await mongoServerInstance.addDocument(database, 'calendarsholidays', document)
            const { _id, name, type, years } = await service.getById({ db, ObjectId }, inserted._id)

            assert.notEqual(_id, 0)
            assert.equal(name, 'Capital Federal')
            assert.equal(type, 1)
            assert.equal(years.length, 1)
            assert.equal(years[0].days.length, 0)

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

    it('should return an error when get the calendar by id', done => {
      mongodb.connect(uri, async (error, db) => {
        if (!error) {
          try {
            await service.getById()
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

  describe('Delete a calendar', () => {
    it('should delete the calendar', done => {
      mongodb.connect(uri, async (error, db) => {
        if (!error) {
          try {
            const inserted = await mongoServerInstance.addDocument(database, 'calendarsholidays', {})

            await service.remove({ db, ObjectId }, inserted._id)
            const calendars = await service.getAll(db)

            assert.equal(calendars.length, 7)
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

    it('should return an error when remove a calendar', done => {
      mongodb.connect(uri, async (error, db) => {
        if (!error) {
          try {
            await service.remove()
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

  describe('Update a calendar', () => {
    it('should return the updated calendar', done => {
      mongodb.connect(uri, async (error, db) => {
        if (!error) {
          try {
            const inserted = await mongoServerInstance.addDocument(database, 'calendarsholidays', { years: [{ year: 2017, days: [] }] })
            const calendar = await service.getById({ db, ObjectId }, inserted._id)

            const set = { name: 'Honduras', type: 1 }
            await service.put({ db, ObjectId }, { calendar, ...set })

            const { name, type, years } = await service.getById({ db, ObjectId }, calendar._id)

            assert.equal(name, 'Honduras')
            assert.equal(type, 1)
            assert.equal(years.length, 1)
            assert.equal(years[0].days.length, 0)

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

    it('should return an error when update a calendar', done => {
      mongodb.connect(uri, async (error, db) => {
        if (!error) {
          try {
            await service.put()
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

  describe('Get the calendar data by Name', () => {
    it('should return the calendar data', done => {
      mongodb.connect(uri, async (error, db) => {
        if (!error) {
          try {
            const { _id, name, type, years } = await service.getByName(db, 'Cataluña')

            assert.notEqual(_id, 0)
            assert.equal(name, 'Cataluña')
            assert.equal(type, 2)
            assert.equal(years.length, 1)
            assert.equal(years[0].days.length, 15)

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

    it('should return an error when get the calendar by Name', done => {
      mongodb.connect(uri, async (error, db) => {
        if (!error) {
          try {
            await service.getByName()
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
