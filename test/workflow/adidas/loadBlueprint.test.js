const loadBlueprint = require('../../../src/workflow/adidas/loadBlueprint')

test('null', () => {
  expect(loadBlueprint(null)).resolves.toEqual(null)
})

test('all data', () => {
  const blueprint = {
    endpoint: {
      outboundTransportProtocol: 'https',
      securityDefinitions: {},
      connectionTimeoutForSystemDomainRequest: 10,
      connectionTimeoutForSystemDomainResponse: 20,
      dropApiKeyFromIncomingCall: true,
      processor: {
        adapter: 'com.something.Class',
        preProcessEnabled: true,
        preInputs: { a: '2' },
        postProcessEnabled: true,
        postInputs: { b: '3' }
      },
      systemDomainAuthentication: {
        type: 'httpBasic',
        username: '!!INPUT',
        password: '!!INPUT'
      },
      apiMethodDetectionKey: '2 4',
      apiMethodDetectionLocations: ['request-path'],
      cors: {
        maxAge: 10,
        cookiesAllowed: true,
        domainsAllowed: ['www.seznam.cz'],
        headersAllowed: [],
        headersExposed: [],
        subDomainMatchingAllowed: true,
        allDomainsEnabled: false
      },
      headersToExcludeFromIncomingCall: ['header']
    },
    endpointMethod: {
      name: 'default method name',
      sampleJsonResponse: '',
      sampleXmlResponse: ''
    }
  }

  expect(loadBlueprint(blueprint)).resolves.toEqual(blueprint)
})

test('error#1', () => {
  const blueprint = {
    endpoint: {
      outboundTransportProtocol: 'ftp'
    }
  }

  expect(loadBlueprint(blueprint)).rejects.toEqual(
    new Error(
      'Blueprint contains errors:\nInvalid prop `endpoint.outboundTransportProtocol` of value `ftp` supplied to `blueprint`, expected one of ["http","https"].'
    )
  )
})

test('error#1', () => {
  const blueprint = {
    endpoint: {
      outboundTransportProtocol: 'http',
      processor: {
        adapter: 'com.something.Class',
        preProcessEnabled: true,
        preInputs: { a: false },
        postProcessEnabled: true,
        postInputs: { b: '3' }
      }
    }
  }

  return expect(loadBlueprint(blueprint)).rejects.toEqual(
    new Error(
      'Blueprint contains errors:\nInvalid prop `endpoint.processor.preInputs.a` of type `boolean` supplied to `blueprint`, expected `string`.'
    )
  )
})
