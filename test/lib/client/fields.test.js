const { makeFieldsParam } = require('../../../src/lib/client/fields')

function makeServiceFieldsParam (fields) {
  return makeFieldsParam('someMethod', 'service', fields)
}

const allServiceFields =
  'id,name,description,created,updated,endpoints,editorHandle,revisionNumber,robotsPolicy,crossdomainPolicy,errorSets,qpsLimitOverall,rfc3986Encode,securityProfile,version,organization'
const onlyServiceFields = 'id,name,endpoints'
const exceptServiceFields =
  'description,created,updated,editorHandle,revisionNumber,robotsPolicy,crossdomainPolicy,errorSets,qpsLimitOverall,rfc3986Encode,securityProfile,version,organization'

test('all #1', () => {
  expect(makeServiceFieldsParam(true)).toEqual(allServiceFields)
})

test('all #2', () => {
  expect(makeServiceFieldsParam('all')).toEqual(allServiceFields)
})

test('only #1', () => {
  expect(makeServiceFieldsParam('id,name,endpoints')).toEqual(onlyServiceFields)
})

test('only #2', () => {
  expect(makeServiceFieldsParam(['id', 'name', 'endpoints'])).toEqual(
    onlyServiceFields
  )
})

test('object with all #1', () => {
  expect(makeServiceFieldsParam({ all: true })).toEqual(allServiceFields)
})

test('object with only #1', () => {
  expect(makeServiceFieldsParam({ only: 'id,name,endpoints' })).toEqual(
    onlyServiceFields
  )
})

test('object with fields (only) #1', () => {
  expect(makeServiceFieldsParam({ fields: 'id,name,endpoints' })).toEqual(
    onlyServiceFields
  )
})

test('object with only #2', () => {
  expect(makeServiceFieldsParam({ only: ['id', 'name', 'endpoints'] })).toEqual(
    onlyServiceFields
  )
})

test('object with except #1', () => {
  expect(makeServiceFieldsParam({ except: 'id,name,endpoints' })).toEqual(
    exceptServiceFields
  )
})

test('object with except #2', () => {
  expect(
    makeServiceFieldsParam({ except: ['id', 'name', 'endpoints'] })
  ).toEqual(exceptServiceFields)
})

test('nested #1', () => {
  const fields = makeServiceFieldsParam({
    only: ['id', 'name'],
    endpoints: {
      only: ['id', 'name', 'allowMissingApiKey'],
      methods: ['id', 'name']
    }
  })
  expect(fields).toEqual(
    'id,name,endpoints.id,endpoints.name,endpoints.allowMissingApiKey,endpoints.methods.id,endpoints.methods.name'
  )
})

test('nested #2', () => {
  const fields = makeServiceFieldsParam({
    except: ['created', 'updated'],
    endpoints: {
      except: ['created', 'updated'],
      methods: true
    },
    errorSets: true
  })

  const expectedFields = [
    'id,name,description,editorHandle,revisionNumber,robotsPolicy,crossdomainPolicy',
    'qpsLimitOverall,rfc3986Encode,securityProfile,version,organization,endpoints.id',
    'endpoints.allowMissingApiKey,endpoints.apiKeyValueLocationKey',
    'endpoints.apiKeyValueLocations,endpoints.apiMethodDetectionKey,endpoints.apiMethodDetectionLocations',
    'endpoints.cache,endpoints.errors,endpoints.connectionTimeoutForSystemDomainRequest',
    'endpoints.connectionTimeoutForSystemDomainResponse,endpoints.cookiesDuringHttpRedirectsEnabled',
    'endpoints.cors,endpoints.customRequestAuthenticationAdapter,endpoints.dropApiKeyFromIncomingCall',
    'endpoints.forceGzipOfBackendCall,endpoints.gzipPassthroughSupportEnabled,endpoints.headersToExcludeFromIncomingCall',
    'endpoints.highSecurity,endpoints.hostPassthroughIncludedInBackendCallHeader,endpoints.inboundSslRequired',
    'endpoints.jsonpCallbackParameter,endpoints.jsonpCallbackParameterValue,endpoints.scheduledMaintenanceEvent',
    'endpoints.forwardedHeaders,endpoints.returnedHeaders,endpoints.name,endpoints.numberOfHttpRedirectsToFollow',
    'endpoints.outboundRequestTargetPath,endpoints.outboundRequestTargetQueryParameters',
    'endpoints.outboundTransportProtocol,endpoints.processor,endpoints.publicDomains,endpoints.requestAuthenticationType',
    'endpoints.requestPathAlias,endpoints.requestProtocol,endpoints.oauthGrantTypes,endpoints.stringsToTrimFromApiKey',
    'endpoints.supportedHttpMethods,endpoints.systemDomainAuthentication,endpoints.systemDomains',
    'endpoints.trafficManagerDomain,endpoints.useSystemDomainCredentials,endpoints.systemDomainCredentialKey',
    'endpoints.systemDomainCredentialSecret,endpoints.rateLimitHeadersEnabled,endpoints.undefinedMethodsAllowed,endpoints.methods.id',
    'endpoints.methods.name,endpoints.methods.created,endpoints.methods.updated,endpoints.methods.sampleJsonResponse',
    'endpoints.methods.sampleXmlResponse,errorSets.id,errorSets.name,errorSets.type',
    'errorSets.jsonp,errorSets.jsonpType,errorSets.errorMessages'
  ].join(',')

  expect(fields).toEqual(expectedFields)
})

test('error', () => {
  expect(() => makeServiceFieldsParam({ only: ['unknownField'] })).toThrow(
    `Invalid fields 'unknownField' for 'someMethod' method call`
  )
})

test('error association', () => {
  expect(() =>
    makeServiceFieldsParam({ only: { unknownAssoc: true } })
  ).toThrow(
    `Invalid fields 'service.unknownAssoc' for 'someMethod' method call`
  )
})

// TODO: improve error message to print 'service.endpoints.unknownNestedField'
test('error nested field', () => {
  expect(() =>
    makeServiceFieldsParam({ only: { endpoints: ['unknownNestedField'] } })
  ).toThrow(`Invalid fields 'unknownNestedField' for 'someMethod' method call`)
})
