module.exports = {
  schema: {
    description: 'Get the status of the components',
    tags: ['health-check'],
    summary: 'Obtain the status of the backends\' components',
    out: {
      description: 'Succesful response',
      code: 200,
      type: 'object'
    }
  }
}
