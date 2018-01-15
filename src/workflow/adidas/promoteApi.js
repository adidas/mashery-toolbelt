// Adidas specific feature
// Promote one api (service with nested entities) to new environment
//   - prepend env to name of service and endpoints (ie: 'DEV name of service')
//   - prepend correct subdomain (ie: qa.internal.domain.com)
//   - prepend 'sit/' to path for SIT environment

const path = require('path')
const makeReplacer = require('./utils/makeReplacer')

function promoteApi(api, options = {}) {
  // Clone source
  const sourceApi = JSON.parse(JSON.stringify(api))
  const targetApi = JSON.parse(JSON.stringify(sourceApi))

  // Prepare replacer functions
  const nameReplacer = makeReplacer(options.name, {
    name: 'name'
  })

  let trafficDomainReplacer

  if(options.trafficDomain && options.trafficDomain.length) {
    trafficDomainReplacer = makeReplacer(options.trafficDomain, {
      name: 'trafficDomain'
    })
  }

  const publicDomainReplacer = makeReplacer(options.publicDomain, {
    name: 'publicDomain'
  })


  const publicPathReplacer = makeReplacer(options.publicPath, {
    name: 'publicPath',
    required: false
  })

  const endpointDomainReplacer = makeReplacer(options.endpointDomain, {
    name: 'endpointDomain'
  })

  const endpointPathReplacer = makeReplacer(options.endpointPath, {
    name: 'endpointPath',
    required: false
  })

  targetApi.service.name = nameReplacer(targetApi.service.name)

  targetApi.service.endpoints.forEach(endpoint => {
    endpoint.name = nameReplacer(endpoint.name)
    // Public
    endpoint.publicDomains[0].address = publicDomainReplacer(endpoint.publicDomains[0].address)
    endpoint.requestPathAlias = publicPathReplacer(endpoint.requestPathAlias)
    // Endpoint
    endpoint.systemDomains[0].address = endpointDomainReplacer(endpoint.systemDomains[0].address)
    endpoint.outboundRequestTargetPath = endpointPathReplacer(endpoint.outboundRequestTargetPath)


    if(trafficDomainReplacer) {
      endpoint.trafficManagerDomain = trafficDomainReplacer(endpoint.trafficManagerDomain)
    } else {
      endpoint.trafficManagerDomain = endpoint.publicDomains[0].address
    }
  })

  return { source: sourceApi, target: targetApi }
}

module.exports = promoteApi
