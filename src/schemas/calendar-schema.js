module.exports = {
  getAll: {
    schema: {
      description: 'Get all the calendars',
      tags: ['calendar'],
      summary: 'Obtain the data of all the calendars',
      out: {
        description: 'Succesful response',
        code: 200,
        type: 'object'
      }
    }
  },
  create: {
    schema: {
      description: 'Create a new calendar',
      tags: ['calendar'],
      summary: 'Create a new calendar with random data',
      payload: {
        type: 'object',
        properties: {
          name: { type: 'string' },
          type: { type: 'number' }
        }
      },
      out: {
        description: 'Succesful response',
        code: 200,
        type: 'object'
      }
    }
  }
}
