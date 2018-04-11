const makeBlueprintParser = require('../../../src/workflow/adidas/makeBlueprintParser')
const servicePropTypes = require('../../../src/workflow/adidas/utils/serviceBlueprintPropTypes')
const serviceBlueprintParser = makeBlueprintParser(servicePropTypes)

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

  expect(serviceBlueprintParser(blueprint)).resolves.toEqual(blueprint)
})

test('error#1', () => {
  const blueprint = {
    endpoint: {
      outboundTransportProtocol: 'ftp'
    }
  }

  expect(serviceBlueprintParser(blueprint)).rejects.toEqual(
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

  return expect(serviceBlueprintParser(blueprint)).rejects.toEqual(
    new Error(
      'Blueprint contains errors:\nInvalid prop `endpoint.processor.preInputs.a` of type `boolean` supplied to `blueprint`, expected `string`.'
    )
  )
})
