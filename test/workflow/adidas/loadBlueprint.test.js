const loadBlueprint = require('../../../src/workflow/adidas/loadBlueprint')

test('null', () => {
  expect(loadBlueprint(null)).toEqual(null)
})

test('all data', () => {
  const blueprint = {
    endpoint: {
      outboundTransportProtocol: "https",
      securityDefinitions: {},
      connectionTimeoutForSystemDomainRequest: 10,
      connectionTimeoutForSystemDomainResponse: 20,
      dropApiKeyFromIncomingCall: true,
      processor: {
        adapter: "com.something.Class",
        preProcessEnabled: true,
        preInputs: {a: "2"},
        postProcessEnabled: true,
        postInputs: {b: "3"},
      },
      systemDomainAuthentication: {
        type: "httpBasic",
        username: "!!INPUT",
        password: "!!INPUT",
      },
      apiMethodDetectionKey: "2 4",
      apiMethodDetectionLocations: ['request-path'],
      cors: {
        maxAge: 10,
        cookiesAllowed: true,
        domainsAllowed: ["www.seznam.cz"],
        headersAllowed: [],
        headersExposed: [],
        subDomainMatchingAllowed: true,
        allDomainsEnabled: false
      },
      headersToExcludeFromIncomingCall: ""
    },
    endpointMethod: {
      "name": "default method name",
      "sampleJsonResponse": "",
      "sampleXmlResponse": ""
    }
  }

  expect(loadBlueprint(blueprint)).toEqual(blueprint)
})

test('error#1', () => {
  const blueprint = {
    endpoint: {
      outboundTransportProtocol: "ftp",
    },
  }

  expect(() => loadBlueprint(blueprint)).toThrow()
})

test('error#1', () => {
  const blueprint = {
    endpoint: {
      outboundTransportProtocol: "http",
      processor: {
        adapter: "com.something.Class",
        preProcessEnabled: true,
        preInputs: {a: false},
        postProcessEnabled: true,
        postInputs: {b: "3"},
      },
    },
  }

  expect(() => loadBlueprint(blueprint)).toThrow()
})
