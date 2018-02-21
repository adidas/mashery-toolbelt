// const deepMap = require('deep-map')

function anonymizeApi(api) {
  const { service: {
    id, endpoints, ...service
  }} = api

  return {
    service,
    endpoints: endpoints.map(({id, ...endpoint}) => endpoint)
  }
}

module.exports = anonymizeApi;