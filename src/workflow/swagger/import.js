const path = require('path')
const SwaggerParser = require('swagger-parser')
const spinner = require('../../utils/spinner')
const buildApiFromSwagger = require('../adidas/buildFromSwagger')
const confirmChanges = require('../../utils/confirmChanges')

function importSwaggerFile(swagger, options) {
  SwaggerParser
    .parse(swagger)
    .then(swaggerData => {
      return confirmChanges({
        before: {},
        after: buildApiFromSwagger(swaggerData, options),
        message: `Are this valid new api from swagger \'${swagger}\'?`,
        action: newData => {
          spinner.start()
          return createApi(newData)
        },
      })
    })
    .then(newService => {
      spinner.stop()
      console.log('Creating api from swagger done')
      console.log(`Service id=${newService.id}`)
    })
    .catch(error => {
      spinner.stop()
      console.error('Creating failed:')
      console.error(error)
    })
}

module.exports = importSwaggerFile
