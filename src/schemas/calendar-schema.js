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
      body: {
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
      params: {
        type: 'object',
        properties: {
          id: { type: 'string' }
        }
      },
      body: {
        type: 'object',
        properties: {
          name: { type: 'string' },
          type: { type: 'number' },
          years: {
            type: 'object',
            properties: {
              year: { type: 'number' },
              days: {
                type: 'array',
                items: {
                  type: 'number'
                }
              }
            }
          }
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
  }
}
