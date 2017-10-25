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
  getById: {
    schema: {
      description: 'Get the calendar by ID',
      tags: ['calendar'],
      summary: 'Obtain the data of the selected calendar',
      params: {
        type: 'object',
        properties: {
          id: { type: 'string' }
        }
      },
      out: {
        description: 'Succesful response',
        code: 200,
        type: 'object'
      }
    }
  },
  getByName: {
    schema: {
      description: 'Get the calendar by name',
      tags: ['calendar'],
      summary: 'Obtain the data of the selected calendar',
      params: {
        type: 'object',
        properties: {
          name: { type: 'string' }
        }
      },
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
      summary: 'Create a new calendar',
      payload: {
        type: 'object',
        properties: {
          name: { type: 'string' },
          type: { type: 'number' },
          year: { type: 'number' },
        }
      },
      out: {
        description: 'Succesful response',
        code: 200,
        type: 'object'
      }
    }
  },
  update: {
    schema: {
      description: 'Update the calendar',
      tags: ['calendar'],
      summary: 'Update the selected calendar',
      properties: {
        id: { type: 'number' }
      },
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
  },
  remove: {
    schema: {
      description: 'Delete a calendar',
      tags: ['calendar'],
      summary: 'Delete the selected calendar',
      properties: {
        id: { type: 'number' }
      },
      out: {
        description: 'Succesful response',
        code: 200,
        type: 'object'
      }
    }
  }
}
