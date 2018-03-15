const path = require('path')
const makeReplacer = require('./utils/makeReplacer')
const deep = require('../../utils/deep')

function modifyValues(api, options = {}) {
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
      name: 'trafficDomain',
      required: false,
    })
  }

  const publicDomainReplacer = makeReplacer(options.publicDomain, {
    name: 'publicDomain',
    required: false,
  })

  const publicPathReplacer = makeReplacer(options.publicPath, {
    name: 'publicPath',
    required: false,
  })

  const endpointDomainReplacer = makeReplacer(options.endpointDomain, {
    name: 'endpointDomain',
    required: false,
  })

  const endpointPathReplacer = makeReplacer(options.endpointPath, {
    name: 'endpointPath',
    required: false,
  })

  targetApi.service.name = nameReplacer(targetApi.service.name, {
    required: false,
  })

  targetApi.service.endpoints.forEach(endpoint => {
    endpoint.name = nameReplacer(endpoint.name)
    // Public
    endpoint.publicDomains = [
      { address: publicDomainReplacer(deep.get(endpoint, 'publicDomains.0.address')) }
    ]

    endpoint.requestPathAlias = publicPathReplacer(endpoint.requestPathAlias)
    // Endpoint

    endpoint.systemDomains = [
      { address: endpointDomainReplacer(deep.get(endpoint, 'systemDomains.0.address')) }
    ]

    endpoint.outboundRequestTargetPath = endpointPathReplacer(endpoint.outboundRequestTargetPath)

    if(trafficDomainReplacer) {
      endpoint.trafficManagerDomain = trafficDomainReplacer(endpoint.trafficManagerDomain)
    } else {
      endpoint.trafficManagerDomain = endpoint.publicDomains[0].address
    }
  })

  return targetApi
}

module.exports = modifyValues
