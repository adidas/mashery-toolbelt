const path = require('path')
const SwaggerParser = require('swagger-parser')
const spinner = require('../../utils/spinner')
const buildApiFromSwagger = require('../adidas/buildFromSwagger')
const modifyValues = require('../adidas/modifyValues')
const confirmChanges = require('../../utils/confirmChanges')

function importSwaggerFile(swagger, options) {
  SwaggerParser
    .parse(swagger)
    .then(swaggerData => {
      const apiFromSwagger = buildApiFromSwagger(swaggerData, options)
      const api = modifyValues(apiFromSwagger, options)
      
      return confirmChanges({
        before: {},
        after: api,
        message: `Are this valid new api from swagger \'${swagger}\'?`,
        action: newApi => {
          spinner.start()
          return createApi(newApi)
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
